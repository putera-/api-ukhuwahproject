import { Type } from "class-transformer"
import { IsDateString, IsInt, IsOptional, IsString, Min, MinLength } from "class-validator"

export class CreateItikafScheduleDto {
    @IsString()
    itikafId: string

    @IsDateString()
    date: Date

    @Type(() => Number)
    @IsInt()
    @Min(0)
    day_index: number

    @IsString()
    @MinLength(1)
    description: string

    @IsString()
    @IsOptional()
    imam_tarawih_id: string

    @IsString()
    @IsOptional()
    imam_qiyamul_lail_id: string

    @IsString()
    @IsOptional()
    ustadz_kajian_id: string
}
