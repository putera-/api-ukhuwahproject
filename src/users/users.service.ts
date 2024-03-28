import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/users/users.interface';
import { Prisma, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AppService } from 'src/app.service';

const select = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  avatar: true,
  avatar_md: true,
  createdAt: true,
  updatedAt: true
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private appService: AppService
  ) { }


  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data,
      select: { ...select }
    });

    return user;
  }

  async findAll(role: UserRole): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { active: true },
      select: { ...select }
    });
  }

  async findOne(id: string, role: UserRole): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id, role, active: true },
      select: { ...select }
    });
    if (!user) throw new NotFoundException();

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findSuperUser(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { role: 'SUPERUSER' },
    });

    return users;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const currentData = await this.prisma.user.findUnique({ where: { id } });
    if (!currentData) throw new NotFoundException();

    const updatedData = await this.prisma.user.update({
      where: { id, active: true },
      data,
      select: { ...select }
    });

    if (currentData.avatar != updatedData.avatar) {
      // photo has been change
      // remove old photo
      this.appService.removeFile(currentData.avatar);
      this.appService.removeFile(currentData.avatar_md);
    }

    return updatedData;
  }

  async remove(id: string, role: UserRole): Promise<void> {
    await this.findOne(id, role);
    await this.prisma.user.update({
      where: { id, role },
      data: { active: false }
    });

    return;
  }

  async validateNewUser(data: any) {
    // check is password
    await this.checkPassword(data);

    // email to lowercase
    data.email = data.email.toLowerCase().trim();

    // check is email taken?
    const checkUser = await this.findByEmail(data.email);
    if (checkUser) throw new ConflictException('Email is already taken!');
  }

  async checkPassword(data) {
    // check is confirm password
    if (data.password != data.confirm_password) {
      throw new BadRequestException('Confirm Password is not match!')
    }

    // remove confirm_password
    delete data.confirm_password;
    // hash password
    data.password = await bcrypt.hash(data.password, 10);
  }
}
