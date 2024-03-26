import { PartialType } from '@nestjs/mapped-types';
import { CreateAsaatidzDto } from './create-asaatidz.dto';

export class UpdateAsaatidzDto extends PartialType(CreateAsaatidzDto) {}
