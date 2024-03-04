import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { PrismaService } from 'src/prisma.service';
import { BlogCategoriesModule } from 'src/blog_categories/blog_categories.module';
import { PhotosModule } from 'src/photos/photos.module';
import { AppService } from 'src/app.service';

@Module({
    controllers: [BlogsController],
    providers: [BlogsService, PrismaService, AppService],
    imports: [BlogCategoriesModule, PhotosModule]
})
export class BlogsModule { }
