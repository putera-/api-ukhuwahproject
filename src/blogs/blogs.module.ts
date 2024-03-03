import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { PrismaService } from 'src/prisma.service';
import { BlogCategoriesService } from 'src/blog_categories/blog_categories.service';
import { BlogCategoriesModule } from 'src/blog_categories/blog_categories.module';

@Module({
    controllers: [BlogsController],
    providers: [BlogsService, PrismaService],
    imports: [BlogCategoriesModule]
})
export class BlogsModule { }
