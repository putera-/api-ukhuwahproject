import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { ChangeRoleDto } from './dto/change-role.dto';

// THIS IS USER-MEMBER CONTROLLER
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Roles(Role.Superuser, Role.Admin)
  @Get()
  findAll() {
    try {
      return this.usersService.findAll(['ADMIN', 'STAFF', 'MEMBER']);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Superuser, Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      // TODO check by role
      return this.usersService.findOne(id, 'MEMBER');
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Superuser, Role.Admin)
  @Patch('activate/:id')
  @HttpCode(204)
  activate(@Param('id') id: string) {
    try {
      return this.usersService.activate(id);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Superuser, Role.Admin)
  @Patch('deactivate/:id')
  @HttpCode(204)
  deactivate(@Param('id') id: string) {
    try {
      return this.usersService.deactivate(id);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Superuser, Role.Admin)
  @Patch('set-role/:id')
  @HttpCode(204)
  setRole(@Param('id') id: string, @Body(new ValidationPipe()) roleDto: ChangeRoleDto) {
    try {
      const role = roleDto.role;

      return this.usersService.setRole(id, role);
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
