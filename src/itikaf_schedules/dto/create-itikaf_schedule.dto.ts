import { Type } from "class-transformer"
import { IsDateString, IsInt, IsString, Min, MinLength } from "class-validator"

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
}
