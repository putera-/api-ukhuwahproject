import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/users/user.interface';
import { Prisma, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const select = {
  id: true,
  email: true,
  name: true,
  role: true,
  deleted: true,
  createdAt: true,
  updatedAt: true
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }


  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data,
      select: { ...select }
    });

    return user;
  }

  async findAll(role: UserRole): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { deleted: false },
      select: { ...select }
    });
  }

  async findOne(id: string, role: UserRole): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id, role, deleted: false },
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

  async update(id: string, data: Prisma.UserUpdateInput, role: UserRole): Promise<User> {
    await this.findOne(id, role);
    return this.prisma.user.update({
      where: { id, role, deleted: false },
      data,
      select: { ...select }
    });
  }

  async remove(id: string, role: UserRole): Promise<void> {
    await this.findOne(id, role);
    await this.prisma.user.update({
      where: { id, role },
      data: { deleted: true }
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
