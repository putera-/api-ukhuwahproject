import { Type } from "class-transformer";
import { IsBoolean, IsISO8601, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
export class CreateCampaignDto {
    @IsString()
    @Length(1, 100)
    title: string;

    @IsString()
    description: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1000)
    target_amount: number;

    @IsISO8601()
    due_date: Date;

    @Type(() => Boolean)
    @IsBoolean()
    @IsOptional()
    active?: boolean;

    @IsISO8601()
    @IsOptional()
    publishedAt?: Date;
}
