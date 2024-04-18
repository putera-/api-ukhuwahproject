import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ForbiddenException, HttpCode } from '@nestjs/common';
import { CreateUserSuperadminDto } from './dto/create-user-superadmin.dto';
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
      await this.usersService.validateNewUser(data);

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
      await this.usersService.validateNewUser(data);

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
      return this.usersService.findAll(['SUPERUSER', 'ADMIN', 'STAFF', 'MEMBER']);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Superuser)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id, 'SUPERUSER');
  }

  // @Patch()
  // use global self user upate

  @Roles(Role.Superuser)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id, 'SUPERUSER');
    } catch (error) {
      throw error;
    }
  }
}
