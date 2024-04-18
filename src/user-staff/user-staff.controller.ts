import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ConflictException, HttpCode } from '@nestjs/common';
import { CreateUserStaffDto } from './dto/create-user-staff.dto';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('user-staff')
export class UserStaffController {
  constructor(private readonly usersService: UsersService) { }

  // create staff by admin
  @Roles(Role.Admin)
  @Post()
  async create(@Body(new ValidationPipe()) data: CreateUserStaffDto) {
    try {
      // validate new user
      await this.usersService.validateNewUser(data);

      // set as superadmin
      data.role = 'STAFF';
      return this.usersService.create(data);
    } catch (error) {
      throw error;
    }
  }

  // get staff by admin
  // @Roles(Role.Admin)
  // @Get()
  // findAll() {
  //   try {
  //     return this.usersService.findAll(['STAFF', 'MEMBER']);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id, 'STAFF');
  }

  // @Patch()
  // use global self user upate

  @Roles(Role.Admin)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id, 'STAFF');
    } catch (error) {
      throw error;
    }
  }
}
