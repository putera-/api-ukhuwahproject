import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/auth.metadata';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import path from 'path';

// THIS IS USER-MEMBER CONTROLLER
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private photoService: PhotosService
  ) { }

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
  @UseInterceptors(FileInterceptor('avatar'))
  async update(@Req() req, @Body(new ValidationPipe()) data: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
    // for avatar
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    // only can update belongs to auth user
    const { id } = req.user;

    // handle change password
    if (data.password) await this.usersService.checkPassword(data);

    // prevent change email
    if (data.email) delete data.email;

    try {
      if (file) {
        const avatarBuffer = file.buffer;

        // resize images to 600, 900, 1200
        const sizes = [{ key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
        await Promise.all(
          sizes.map(async (s) => {
            const { key, size } = s;
            const filename = `${uniqueSuffix}_${key}.${ext}`;
            const filepath = path.join('./uploads/photos/' + filename);

            await this.photoService.resize(size, avatarBuffer, filepath);
          })
        );

        data.avatar = `/uploads/photos/${uniqueSuffix}_lg.${ext}`;
        data.avatar_md = `/uploads/photos/${uniqueSuffix}_md.${ext}`;
      }

      return this.usersService.update(id, data);
    } catch (error) {
      // remove avatar
      if (file) {
        this.photoService.removeFile(`/uploads/photos/${uniqueSuffix}_lg.${ext}`)
        this.photoService.removeFile(`/uploads/photos/${uniqueSuffix}_md.${ext}`)
      }
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
