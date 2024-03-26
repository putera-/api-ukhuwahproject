import { PartialType } from '@nestjs/mapped-types';
import { CreateItikafScheduleDto } from './create-itikaf_schedule.dto';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';

export class UpdateItikafScheduleDto extends PartialType(CreateItikafScheduleDto) {
    @IsArray()
    photos: {
        id: string,
        index: number
    }[]
}
