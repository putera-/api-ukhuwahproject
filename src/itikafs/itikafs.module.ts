import { Module } from '@nestjs/common';
import { ItikafsService } from './itikafs.service';
import { ItikafsController } from './itikafs.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ItikafsController],
  providers: [ItikafsService, PrismaService],
})
export class ItikafsModule { }
