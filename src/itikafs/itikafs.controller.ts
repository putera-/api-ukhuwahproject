import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, UseInterceptors, UploadedFiles, HttpCode } from '@nestjs/common';
import { ItikafsService } from './itikafs.service';
import { CreateItikafDto } from './dto/create-itikaf.dto';
import { UpdateItikafDto } from './dto/update-itikaf.dto';
import { Public } from 'src/auth/auth.metadata';
import { Prisma } from '@prisma/client';
import { PhotosService } from 'src/photos/photos.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Itikaf } from './itikafs.interface';

@Controller('itikafs')
export class ItikafsController {
  constructor(
    private readonly itikafsService: ItikafsService,
    private photoService: PhotosService
  ) { }

  @Roles(Role.Admin, Role.Staff)
  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10)) // key=photo. max = 10
  async create(@Req() req, @Body(new ValidationPipe) createItikafDto: CreateItikafDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Itikaf> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
      // save photos
      let photos = [];
      if (files) photos = await this.photoService.createMany(files, uniqueSuffix);

      const data: Record<string, any> | Prisma.ItikafCreateInput = { ...createItikafDto };
      data.createdBy = {
        connect: { id: req.user.id }
      }

      return this.itikafsService.create(data as Prisma.ItikafCreateInput, photos);

    } catch (error) {
      // remove photo
      if (files) this.photoService.removeMany(files, uniqueSuffix);

      throw error;
    }
  }

  @Public()
  @Get()
  findAll() {
    try {
      return this.itikafsService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':hijri_year')
  findOne(@Param('hijri_year') hijri_year: string) {
    try {
      return this.itikafsService.findOne(hijri_year);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Patch(':hijri_year')
  @UseInterceptors(FilesInterceptor('new_photos', 10)) // key=new_photos. max = 10
  async update(@Param('hijri_year') hijri_year: string, @Body(new ValidationPipe()) updateItikafDto: UpdateItikafDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Itikaf> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    try {
      // save photos
      let new_photos = [];
      if (files) new_photos = await this.photoService.createMany(files, uniqueSuffix);

      return this.itikafsService.update(hijri_year, updateItikafDto as Prisma.ItikafUpdateInput, new_photos);
    } catch (error) {
      // remove photo
      if (files) this.photoService.removeMany(files, uniqueSuffix);

      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Patch('activate/:hijri_year')
  @HttpCode(204)
  activate(@Param('hijri_year') hijri_year: string) {
    try {
      return this.itikafsService.updateActive(hijri_year, true);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Patch('deactivate/:hijri_year')
  @HttpCode(204)
  deactivate(@Param('hijri_year') hijri_year: string) {
    try {
      return this.itikafsService.updateActive(hijri_year, false);
    } catch (error) {
      throw error;
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itikafsService.remove(id);
  // }
}
