import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ConflictException, HttpCode } from '@nestjs/common';
import { CreateUserStaffDto } from './dto/create-user-staff.dto';
import { UpdateUserStaffDto } from './dto/update-user-staff.dto';
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
  @Roles(Role.Admin)
  @Get()
  findAll() {
    try {
      return this.usersService.findAllByRole('STAFF');
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(Role.Admin, Role.Staff)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateUserStaffDto) {
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

  @Roles(Role.Admin)
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
