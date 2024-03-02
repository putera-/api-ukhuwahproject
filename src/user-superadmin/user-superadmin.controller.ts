import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ForbiddenException, HttpCode } from '@nestjs/common';
import { CreateUserSuperadminDto } from './dto/create-user-superadmin.dto';
import { UpdateUserSuperadminDto } from './dto/update-user-superadmin.dto';
import { Public } from 'src/auth/auth.metadata';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('user-superadmin')
export class UserSuperadminController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post('first')
  async createFirst(@Body(new ValidationPipe()) data: CreateUserSuperadminDto) {
    try {
      // check is super user already exist
      const supers = await this.usersService.findSuperUser();
      if (supers.length) throw new ForbiddenException();

      // validate new user
      this.usersService.validateNewUser(data);

      // set as superadmin
      data.role = 'SUPERUSER';
      return this.usersService.create(data);
    } catch (error) {
      throw error;
    }
  }

  // create superuser by superuser
  @Roles(Role.Superuser)
  @Post()
  async create(@Body(new ValidationPipe()) data: CreateUserSuperadminDto) {
    try {
      // validate new user
      this.usersService.validateNewUser(data);

      // set as superadmin
      data.role = 'SUPERUSER';
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
      return this.usersService.findAllByRole('SUPERUSER');
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
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateUserSuperadminDto) {
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
