import { Module } from '@nestjs/common';
import { AsaatidzsService } from './asaatidzs.service';
import { AsaatidzsController } from './asaatidzs.controller';
import { PrismaService } from 'src/prisma.service';
import { PhotosService } from 'src/photos/photos.service';

@Module({
  controllers: [AsaatidzsController],
  providers: [AsaatidzsService, PrismaService, PhotosService],
})
export class AsaatidzsModule { }
