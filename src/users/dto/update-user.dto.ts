import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsBoolean()
    @IsOptional()
    active: boolean

    @IsString()
    @IsOptional()
    avatar: string

    @IsString()
    @IsOptional()
    avatar_md: string
}
