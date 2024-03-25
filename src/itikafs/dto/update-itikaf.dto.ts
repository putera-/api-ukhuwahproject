import { PartialType } from '@nestjs/mapped-types';
import { CreateItikafDto } from './create-itikaf.dto';

export class UpdateItikafDto extends PartialType(CreateItikafDto) {}
