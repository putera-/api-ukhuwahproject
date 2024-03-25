import { PartialType } from '@nestjs/mapped-types';
import { CreateItikafScheduleDto } from './create-itikaf_schedule.dto';
import { IsArray, IsBoolean } from 'class-validator';

export class UpdateItikafScheduleDto extends PartialType(CreateItikafScheduleDto) {
    @IsBoolean()
    deleted: boolean

    @IsArray()
    photos: {
        id: string,
        index: number
    }[]
}
