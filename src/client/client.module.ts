import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { PhotosService } from 'src/photos/photos.service';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    PrismaService,
    PhotosService,
    AppService
  ]
})
export class ClientModule { }
