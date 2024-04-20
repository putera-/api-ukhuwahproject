import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Midtrans from 'midtrans-client';
import { PrismaService } from 'src/prisma.service';
import { Donation } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { MidtransCallback, Transaction } from 'src/campaigns/campaigns.interface';

@Injectable()
export class PaymentsService {
    constructor(
        private prisma: PrismaService,
    ) { }
    // create(createPaymentDto: CreatePaymentDto) {
    //   return 'This action adds a new payment';
    // }

    // findAll() {
    //   return `This action returns all payment`;
    // }

    // findOne(id: number) {
    //   return `This action returns a #${id} payment`;
    // }

    // update(id: number, updatePaymentDto: UpdatePaymentDto) {
    //   return `This action updates a #${id} payment`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} payment`;
    // }

    async createMidTransToken(parameter: Record<string, any>): Promise<string> {
        const snap = new Midtrans.Snap({
            isProduction: process.env.PRODUCTION == 'false' ? false : true,
            serverKey: process.env.MIDTRANS_SERVER_KEY
        });

        const { token } = await snap.createTransaction(parameter);

        return token;
    }


    async createDonation(data: Prisma.DonationCreateInput): Promise<Donation> {
        return this.prisma.donation.create({ data })
    }

    async createCampaignTransaction(data: Prisma.TransactionCreateInput): Promise<Transaction> {
        return this.prisma.transaction.create({ data })
    }

    async updateCampaignTransaction(data: Prisma.TransactionUpdateInput, transactionId: string): Promise<Transaction> {
        return this.prisma.transaction.update({
            where: { id: transactionId },
            data
        });
    }

    async updateCampaignDonation(data: Prisma.DonationUpdateInput, donationId: string): Promise<Donation> {
        return this.prisma.donation.update({
            where: { id: donationId },
            data
        });
    }

    async getCampaignTransaction(id: string): Promise<Transaction> {
        return this.prisma.transaction.findUnique({
            where: { id },
            include: {
                Donation: true
            }
        })
    }

    async createMidtransCallBack(data: Prisma.MidtransCallbackCreateInput, transactionId: string): Promise<MidtransCallback> {
        return this.prisma.midtransCallback.upsert({
            where: { transactionId },
            update: data,
            create: data
        });
    }
}
