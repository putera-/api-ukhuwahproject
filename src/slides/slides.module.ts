import { Module } from '@nestjs/common';
import { SlidesService } from './slides.service';
import { SlidesController } from './slides.controller';
import { PhotosService } from 'src/photos/photos.service';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [SlidesController],
  providers: [SlidesService, PhotosService, PrismaService, AppService],
})
export class SlidesModule { }
