import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Public } from 'src/auth/auth.metadata';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from 'src/app.service';
import { Prisma } from '@prisma/client';
import { PhotosService } from 'src/photos/photos.service';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private photoService: PhotosService,
    private appService: AppService
  ) { }

  @Public()
  @Get()
  find() {
    try {
      return this.clientService.find();
    } catch (error) {
      throw error
    }
  }

  @Roles(Role.Superuser, Role.Admin)
  @Patch()
  @UseInterceptors(FileInterceptor('logo'))
  async update(@Body(new ValidationPipe()) updateClientDto: UpdateClientDto, @UploadedFile() file: Express.Multer.File) {
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
      const data: Prisma.ClientUpdateInput = { ...updateClientDto };

      if (file) {
        data.logo = await this.photoService.create(file, uniqueSuffix, ext);
        data.logo_sm = await this.photoService.create(file, `${uniqueSuffix}_sm`, ext, 600);
      }

      return this.clientService.update(data);
    } catch (error) {
      if (file) {
        this.appService.removeFile(`/public/photos/${uniqueSuffix}.${ext}`);
        this.appService.removeFile(`/public/photos/${uniqueSuffix}_sm.${ext}`);
      }

      throw error
    }
  }
}
