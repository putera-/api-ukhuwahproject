import { Module } from '@nestjs/common';
import { ItikafsService } from './itikafs.service';
import { ItikafsController } from './itikafs.controller';
import { PrismaService } from 'src/prisma.service';
import { PhotosModule } from 'src/photos/photos.module';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ItikafsController],
  providers: [ItikafsService, PrismaService, AppService],
  imports: [PhotosModule]
})
export class ItikafsModule { }
