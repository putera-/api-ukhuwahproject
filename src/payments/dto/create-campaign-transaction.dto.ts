import { IsNumber, IsString, Min, min } from "class-validator"

export class CreateCampaignTransactionDto {
    @IsString()
    callbacks: string

    @IsString()
    campaignId: string

    @IsNumber()
    @Min(1000)
    gross_amount: number
}
