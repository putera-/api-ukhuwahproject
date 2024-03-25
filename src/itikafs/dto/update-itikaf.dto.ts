import { PartialType } from '@nestjs/mapped-types';
import { CreateItikafDto } from './create-itikaf.dto';
import { IsArray } from 'class-validator';

export class UpdateItikafDto extends PartialType(CreateItikafDto) {
    @IsArray()
    photos: {
        id: string,
        index: number
    }[]
}
