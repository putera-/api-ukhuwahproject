import { Module } from '@nestjs/common';
import { CourseCategoriesService } from './course_categories.service';
import { CourseCategoriesController } from './course_categories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CourseCategoriesController],
  providers: [CourseCategoriesService, PrismaService],
  exports: [CourseCategoriesService]
})
export class CourseCategoriesModule { }
