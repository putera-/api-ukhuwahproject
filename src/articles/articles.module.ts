import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaService } from 'src/prisma.service';
import { PhotosModule } from 'src/photos/photos.module';
import { AppService } from 'src/app.service';

@Module({
    controllers: [ArticlesController],
    providers: [ArticlesService, PrismaService, AppService],
    imports: [PhotosModule]
})
export class ArticlesModule { }
