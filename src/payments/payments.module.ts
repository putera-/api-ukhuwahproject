import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaService } from 'src/prisma.service';
import { CampaignsService } from 'src/campaigns/campaigns.service';
import { UsersService } from 'src/users/users.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [PaymentsController],
    providers: [PaymentsService, PrismaService, CampaignsService, UsersService, AppService],
})
export class PaymentsModule { }
