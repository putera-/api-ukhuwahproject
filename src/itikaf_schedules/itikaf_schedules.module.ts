import { Module } from '@nestjs/common';
import { ItikafSchedulesService } from './itikaf_schedules.service';
import { ItikafSchedulesController } from './itikaf_schedules.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ItikafSchedulesController],
  providers: [ItikafSchedulesService, PrismaService],
})
export class ItikafSchedulesModule { }
