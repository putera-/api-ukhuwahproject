import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/auth.metadata';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

// THIS IS USER-MEMBER CONTROLLER
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public() // TODO check
  @Post()
  async create(@Body(new ValidationPipe()) data: CreateUserDto) {
    try {
      // validate new user
      await this.usersService.validateNewUser(data);

      return this.usersService.create(data);
    } catch (error) {
      throw error;
    }
  }


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

  // update selft superadmin, admin, staff, member
  @Patch()
  async update(@Req() req, @Body(new ValidationPipe()) data: UpdateUserDto) {
    // only can update belongs to auth user
    const { id } = req.user;

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
      return this.usersService.remove(id, 'SUPERUSER');
    } catch (error) {
      throw error;
    }
  }
}
