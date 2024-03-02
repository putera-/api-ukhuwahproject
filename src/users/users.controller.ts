import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, ConflictException, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateSuperUserDto } from './dto/create-superuser.dto';
import { Public } from 'src/auth/auth.metadata';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public() // TODO check
  @Post()
  async create(@Body(new ValidationPipe()) data: CreateUserDto) {
    try {
      // check is password
      await this.usersService.checkPassword(data);

      // email to lowercase
      data.email = data.email.toLowerCase().trim();

      // check is email taken?
      const checkUser = await this.usersService.findByEmail(data.email);
      if (checkUser) throw new ConflictException('Email is already taken!');

      return this.usersService.create(data);
    } catch (error) {
      throw error;
    }
  }







  // TODO create admin by super user

  // get admin users
  @Roles(Role.Superuser)
  @Get('admins')
  findAllAdmins() {
    try {
      return this.usersService.findAllByRole('ADMIN');
    } catch (error) {
      throw error;
    }
  }

  // TODO create staff by super user

  // get user staffs
  @Roles(Role.Superuser, Role.Admin)
  @Get('staffs')
  findAllStaffs() {
    try {
      return this.usersService.findAllByRole('STAFF');
    } catch (error) {
      throw error;
    }
  }

  // get user member
  @Roles(Role.Superuser, Role.Admin, Role.Staff)
  @Get('members')
  findAllMembers() {
    try {
      return this.usersService.findAllByRole('MEMBER');
    } catch (error) {
      throw error;
    }
  }


  @Roles(Role.Superuser)
  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      // TODO check by role
      return this.usersService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateUserDto) {
    // TODO check is belongs to auth user

    // handle change password
    if (data.password) await this.usersService.checkPassword(data);

    // prevent change email
    if (data.email) delete data.email;

    try {
      return this.usersService.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
