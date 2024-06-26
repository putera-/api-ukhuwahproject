import { Controller, Get, Post, Body, Patch, Param, ValidationPipe, Req, UseInterceptors, HttpCode, UploadedFile } from '@nestjs/common';
import { ItikafsService } from './itikafs.service';
import { CreateItikafDto } from './dto/create-itikaf.dto';
import { UpdateItikafDto } from './dto/update-itikaf.dto';
import { Public } from 'src/auth/auth.metadata';
import { Prisma } from '@prisma/client';
import { PhotosService } from 'src/photos/photos.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { Itikaf } from './itikafs.interface';
import { AppService } from 'src/app.service';

@Controller('itikafs')
export class ItikafsController {
  constructor(
    private readonly itikafsService: ItikafsService,
    private photoService: PhotosService,
    private appService: AppService
  ) { }

  @Roles(Role.Admin, Role.Staff)
  @Post(':hijri_year')
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Param('hijri_year') hijri_year: string, @Req() req, @Body(new ValidationPipe) createItikafDto: CreateItikafDto, @UploadedFile() file: Express.Multer.File): Promise<Itikaf> {
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
      const data: Record<string, any> | Prisma.ItikafCreateInput = { ...createItikafDto };
      data.year = String(new Date().getFullYear());
      data.hijri_year = hijri_year;

      if (file) {
        data.photo = await this.photoService.create(file, uniqueSuffix, ext);
        data.photo_sm = await this.photoService.create(file, `${uniqueSuffix}_sm`, ext, 600);
      }

      data.createdBy = {
        connect: { id: req.user.id }
      }

      return this.itikafsService.create(data as Prisma.ItikafCreateInput);

    } catch (error) {
      // remove photo
      if (file) this.appService.removeFile(`/public/photos/${uniqueSuffix}.${ext}`)
      if (file) this.appService.removeFile(`/public/photos/${uniqueSuffix}_sm.${ext}`)

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
  findOne(@Param('hijri_year') hijri_year: string, @Req() req) {
    try {
      const userId: string | undefined = req.user ? req.user.id : undefined;

      return this.itikafsService.findOne(hijri_year, userId);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Patch(':hijri_year')
  @UseInterceptors(FileInterceptor('photo'))
  async update(@Param('hijri_year') hijri_year: string, @Body(new ValidationPipe()) updateItikafDto: UpdateItikafDto, @UploadedFile() file: Express.Multer.File): Promise<Itikaf> {
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    try {
      // save photos
      const data: Prisma.ItikafUpdateInput = { ...updateItikafDto };
      if (file) {
        data.photo = await this.photoService.create(file, uniqueSuffix, ext);
        data.photo_sm = await this.photoService.create(file, `${uniqueSuffix}_sm`, ext, 600);
      }


      return this.itikafsService.update(hijri_year, data as Prisma.ItikafUpdateInput);
    } catch (error) {
      // remove photo
      if (file) this.appService.removeFile(`/public/photos/${uniqueSuffix}.${ext}`)
      if (file) this.appService.removeFile(`/public/photos/${uniqueSuffix}_sm.${ext}`)

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
