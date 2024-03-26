import { PartialType } from '@nestjs/mapped-types';
import { CreateItikafParticipantDto } from './create-itikaf_participant.dto';

export class UpdateItikafParticipantDto extends PartialType(CreateItikafParticipantDto) {}
