import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class UpdateUserAdminDto extends PartialType(CreateUserDto) {
    @IsBoolean()
    @IsOptional()
    deleted: boolean
}