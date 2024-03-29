import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, AppService],
  exports: [PhotosService]
})
export class PhotosModule { }
