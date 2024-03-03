import { Module } from '@nestjs/common';
import { BlogCategoriesService } from './blog_categories.service';
import { BlogCategoriesController } from './blog_categories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BlogCategoriesController],
  providers: [BlogCategoriesService, PrismaService],
  exports: [BlogCategoriesService]
})
export class BlogCategoriesModule { }
