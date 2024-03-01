import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/users/user.interface';
import { Prisma, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const select = {
  id: true,
  email: true,
  name: true,
  clientId: true,
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

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { deleted: false },
      select: { ...select }
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id, deleted: false },
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

  async findAllByRole(role: UserRole): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { role, deleted: false },
      select: { ...select }
    });

    return users;
  }

  async findSuperUser(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { role: 'SUPERUSER' },
    });

    return users;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id, deleted: false },
      data,
      select: { ...select }
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.user.update({
      where: { id },
      data: { deleted: true }
    });

    return;
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
