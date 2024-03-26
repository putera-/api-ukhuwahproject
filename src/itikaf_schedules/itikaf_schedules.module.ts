import { Module } from '@nestjs/common';
import { ItikafSchedulesService } from './itikaf_schedules.service';
import { ItikafSchedulesController } from './itikaf_schedules.controller';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { PhotosModule } from 'src/photos/photos.module';
import { ItikafParticipantsService } from 'src/itikaf_participants/itikaf_participants.service';

@Module({
  controllers: [ItikafSchedulesController],
  providers: [ItikafSchedulesService, PrismaService, AppService, ItikafParticipantsService],
  imports: [PhotosModule]
})
export class ItikafSchedulesModule { }
