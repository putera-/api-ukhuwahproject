import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { PrismaService } from 'src/prisma.service';
import { PhotosService } from 'src/photos/photos.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [CampaignsController],
    providers: [CampaignsService, PrismaService, PhotosService, AppService],
})
export class CampaignsModule { }
