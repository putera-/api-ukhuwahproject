import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ValidationPipe, UploadedFile } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import path from 'path';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Public } from 'src/auth/auth.metadata';
import { Prisma } from '@prisma/client';

// TODO test all path
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private photoService: PhotosService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(@Body(new ValidationPipe()) createCourseDto: CreateCourseDto, @UploadedFile() file: Express.Multer.File) {
    // for thumbnail
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
      // get category
      const category = await this.coursesService.getCategory(createCourseDto.category);

      const data: Record<string, any> | Prisma.CourseCreateInput = { ...createCourseDto };
      // set category
      data.category = {
        connect: { id: category.id }
      }

      if (file) {
        const thumbnailBuffer = file.buffer;

        // resize images to 600, 900, 1200
        const sizes = [{ key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
        await Promise.all(
          sizes.map(async (s) => {
            const { key, size } = s;
            const filename = `${uniqueSuffix}_${key}.${ext}`;
            const filepath = path.join('./uploads/photos/' + filename);

            await this.photoService.resize(size, thumbnailBuffer, filepath);
          })
        );

        data.thumbnail = `/uploads/photos/${uniqueSuffix}_lg.${ext}`;
        data.thumbnail_md = `/uploads/photos/${uniqueSuffix}_md.${ext}`;
      }

      return this.coursesService.create(data as Prisma.CourseCreateInput);

    } catch (error) {
      // remove thumbnail
      if (file) {
        this.photoService.removeFile(`/uploads/photos/${uniqueSuffix}_lg.${ext}`)
        this.photoService.removeFile(`/uploads/photos/${uniqueSuffix}_md.${ext}`)
      }
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Get()
  findAll() {
    try {
      return this.coursesService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Get('publish')
  findAllPublish() {
    try {
      return this.coursesService.findAllPublish();
    } catch (error) {
      throw error;
    }
  }
  @Roles(Role.Admin, Role.Staff)
  @Get('draft')
  findAllDraft() {
    try {
      return this.coursesService.findAllDraft();
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.coursesService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @UploadedFile() file: Express.Multer.File) {
    // for thumbnail
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    try {
      const data: Record<string, any> | Prisma.CourseUpdateInput = { ...updateCourseDto };

      if (data.category) {
        // get category
        const category = await this.coursesService.getCategory(data.category);

        // set category
        data.category = {
          connect: { id: category.id }
        }
      }


      if (file) {
        const thumbnailBuffer = file.buffer;

        // resize images to 600, 900, 1200
        const sizes = [{ key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
        await Promise.all(
          sizes.map(async (s) => {
            const { key, size } = s;
            const filename = `${uniqueSuffix}_${key}.${ext}`;
            const filepath = path.join('./uploads/photos/' + filename);

            await this.photoService.resize(size, thumbnailBuffer, filepath);
          })
        );

        data.thumbnail = `/uploads/photos/${uniqueSuffix}_lg.${ext}`;
        data.thumbnail_md = `/uploads/photos/${uniqueSuffix}_md.${ext}`;
      }


      return this.coursesService.update(id, data as Prisma.CourseUpdateInput);

    } catch (error) {
      // remove thumbnail
      if (file) {
        this.photoService.removeFile(`/uploads/photos/${uniqueSuffix}_lg.${ext}`)
        this.photoService.removeFile(`/uploads/photos/${uniqueSuffix}_md.${ext}`)
      }

      throw error;
    }

  }

  @Roles(Role.Admin, Role.Staff)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
