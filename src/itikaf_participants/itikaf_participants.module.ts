import { Module } from '@nestjs/common';
import { ItikafParticipantsService } from './itikaf_participants.service';
import { ItikafParticipantsController } from './itikaf_participants.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ItikafParticipantsController],
  providers: [ItikafParticipantsService, PrismaService],
})
export class ItikafParticipantsModule { }
