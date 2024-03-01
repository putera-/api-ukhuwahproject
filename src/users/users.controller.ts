import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, ConflictException, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateSuperUserDto } from './dto/create-superuser.dto';
import { Public } from 'src/auth/auth.metadata';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
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

  @Public()
  @Post('create-first-superuser')
  async createFirstSuperAdmin(@Body(new ValidationPipe()) data: CreateSuperUserDto) {
    try {
      // check is super user already exist
      const supers = await this.usersService.findSuperUser();
      if (supers.length) throw new ForbiddenException();

      // check is password
      await this.usersService.checkPassword(data);

      // email to lowercase
      data.email = data.email.toLowerCase().trim();

      // check is email taken?
      const checkUser = await this.usersService.findByEmail(data.email);
      if (checkUser) throw new ConflictException('Email is already taken!');

      // set as superadmin
      data.role = 'SUPERUSER';
      return this.usersService.create(data);
    } catch (error) {
      throw error;
    }
  }

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
      return this.usersService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
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
