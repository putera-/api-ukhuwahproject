import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

// THIS IS USER-MEMBER CONTROLLER
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Roles(Role.Admin, Role.Staff)
  @Get()
  findAll() {
    try {
      return this.usersService.findAll('MEMBER');
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      // TODO check by role
      return this.usersService.findOne(id, 'MEMBER');
    } catch (error) {
      throw error;
    }
  }

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
