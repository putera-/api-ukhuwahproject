import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserSuperadminDto extends PartialType(CreateUserDto) {
    @IsBoolean()
    @IsOptional()
    deleted: boolean
}
