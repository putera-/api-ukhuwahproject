import {
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    old_password: string;

    @IsString()
    @Length(6, 100)
    password: string;

    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
