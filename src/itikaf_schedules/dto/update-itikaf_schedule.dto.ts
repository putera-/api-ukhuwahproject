import { PartialType } from '@nestjs/mapped-types';
import { CreateItikafScheduleDto } from './create-itikaf_schedule.dto';

export class UpdateItikafScheduleDto extends PartialType(CreateItikafScheduleDto) { }
