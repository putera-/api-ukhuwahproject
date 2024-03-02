import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ValidationPipe, HttpCode } from '@nestjs/common';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('user-admin')
export class UserAdminController {
  constructor(private readonly usersService: UsersService) { }

  // create admin by superuser
  @Roles(Role.Superuser)
  @Post()
  async create(@Body(new ValidationPipe()) data: CreateUserAdminDto) {
    try {
      // check is password
      await this.usersService.checkPassword(data);

      // email to lowercase
      data.email = data.email.toLowerCase().trim();

      // check is email taken?
      const checkUser = await this.usersService.findByEmail(data.email);
      if (checkUser) throw new ConflictException('Email is already taken!');

      // set as superadmin
      data.role = 'ADMIN';
      return this.usersService.create(data);
    } catch (error) {
      throw error;
    }
  }

  // get superuser by super user
  @Roles(Role.Superuser)
  @Get()
  findAll() {
    try {
      return this.usersService.findAllByRole('ADMIN');
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Superuser)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(Role.Superuser)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateUserAdminDto) {
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

  @Roles(Role.Superuser)
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
