import { Module } from '@nestjs/common';
import { AsaatidzsService } from './asaatidzs.service';
import { AsaatidzsController } from './asaatidzs.controller';
import { PrismaService } from 'src/prisma.service';
import { PhotosService } from 'src/photos/photos.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [AsaatidzsController],
  providers: [AsaatidzsService, PrismaService, PhotosService, AppService],
})
export class AsaatidzsModule { }
