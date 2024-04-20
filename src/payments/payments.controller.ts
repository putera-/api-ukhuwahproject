import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, NotFoundException, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateCampaignTransactionDto } from './dto/create-campaign-transaction.dto';
import { Prisma } from '@prisma/client';
import { Campaign, Donation, Transaction } from 'src/campaigns/campaigns.interface';
import { CampaignsService } from 'src/campaigns/campaigns.service';
import { User } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/auth/auth.metadata';
import dayjs from 'dayjs';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly campaignService: CampaignsService,
        private readonly usersService: UsersService,
    ) { }

    // @Post()
    // create(@Body() createPaymentDto: CreatePaymentDto) {
    //   return this.paymentsService.create(createPaymentDto);
    // }

    // @Get()
    // findAll() {
    //   return this.paymentsService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.paymentsService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    //   return this.paymentsService.update(+id, updatePaymentDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.paymentsService.remove(+id);
    // }

    @Post('campaign/transaction')
    async createCampaignTransaction(@Req() req, @Body(new ValidationPipe) data: CreateCampaignTransactionDto): Promise<Transaction> {
        try {

            const campaign: Campaign = await this.campaignService.findOne(data.campaignId);

            const userId = req.user.id;
            const user: User = await this.usersService.findOne(req.user.id, req.user.role);

            const dataDonation: Prisma.DonationCreateInput = {
                Campaign: { connect: { id: data.campaignId } },
                User: { connect: { id: userId } },
                gross_amount: data.gross_amount
            }
            const donation: Donation = await this.paymentsService.createDonation(dataDonation);

            const dataTransaction: Prisma.TransactionCreateInput = {
                Donation: { connect: { id: donation.id } },
                gross_amount: data.gross_amount,
            }

            let transaction: Transaction = await this.paymentsService.createCampaignTransaction(dataTransaction)

            // const dataTransaction
            const midtransParameter = {
                transaction_details: {
                    order_id: transaction.id,
                    gross_amount: data.gross_amount
                },
                item_details: [{
                    id: campaign.id,
                    price: data.gross_amount,
                    quantity: 1,
                    name: campaign.title.substring(0, 47) + '...',
                }],
                customer_details: {
                    first_name: user.name,
                    email: user.email,
                    phone: user.phone,
                }
            }

            const token = await this.paymentsService.createMidTransToken(midtransParameter);

            transaction = await this.paymentsService.updateCampaignTransaction({ midtransToken: token }, transaction.id);

            return transaction;
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Post('midtrans_notification')
    @HttpCode(200)
    async setPaymentStatusFromMitrans(@Body() data: any): Promise<any> {
        try {
            if (!data.order_id) return;
            const status = data.transaction_status;

            const transaction: Transaction = await this.paymentsService.getCampaignTransaction(data.order_id);
            if (!transaction) throw new NotFoundException();

            // update transaction & donation status
            const dataUpdate: Record<string, any> = {
                status
            }

            if (data.settlement_time) {
                dataUpdate.paidAt = new Date()
            }

            await this.paymentsService.updateCampaignTransaction(dataUpdate, transaction.id);
            await this.paymentsService.updateCampaignDonation(dataUpdate, transaction.donationId);

            // re-calclutate collected gross amount
            if (status == 'settlement' && transaction.Donation) {
                await this.campaignService.calculateDonation(transaction.Donation.campaignId);
            }

            const dataMidtransCallback: Prisma.MidtransCallbackCreateInput = {
                Transaction: { connect: { id: transaction.id } },
                callback_data: JSON.stringify(data)
            }
            await this.paymentsService.createMidtransCallBack(dataMidtransCallback, data.order_id);

            return { success: "OK" };
        } catch (error) {
            throw error;
        }
    }
}
