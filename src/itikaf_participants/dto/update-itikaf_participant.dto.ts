import { PartialType } from '@nestjs/mapped-types';
import { CreateItikafParticipantDto } from './create-itikaf_participant.dto';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateItikafParticipantDto extends PartialType(CreateItikafParticipantDto) {
    @IsString()
    @IsOptional()
    unparticipate_reason: string
}
