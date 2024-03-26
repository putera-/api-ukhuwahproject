import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpCode } from '@nestjs/common';
import { SlidesService } from './slides.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import { Public } from 'src/auth/auth.metadata';
import { AppService } from 'src/app.service';

@Controller('slides')
export class SlidesController {
  constructor(
    private readonly slidesService: SlidesService,
    private photoService: PhotosService,
    private appService: AppService
  ) { }

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10))
  async create(@UploadedFiles() files: Array<Express.Multer.File>) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    try {
      // save photos
      let photos = [];
      if (files) {
        photos = await this.photoService.createMany(files, uniqueSuffix);
        photos = photos.map(p => p.path);

        // remove md file, just need the lg file
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const ext = file.originalname.split('.').pop();

          this.appService.removeFile(`/public/photos/${uniqueSuffix}${i}_md.${ext}`);
        }
      };


      return this.slidesService.create(photos);

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
      return this.slidesService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.slidesService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    try {
      return this.slidesService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
