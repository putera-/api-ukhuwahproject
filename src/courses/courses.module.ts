import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/prisma.service';
import { CourseCategoriesModule } from 'src/course_categories/course_categories.module';
import { PhotosModule } from 'src/photos/photos.module';
import { AppService } from 'src/app.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService, AppService],
  imports: [CourseCategoriesModule, PhotosModule]
})
export class CoursesModule { }
