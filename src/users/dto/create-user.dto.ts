import { Equals, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Length, Matches, equals } from "class-validator"

export class CreateUserDto {
    @IsString()
    @Length(1, 100)
    name: string

    @IsEmail()
    email: string

    @IsString()
    @IsStrongPassword()
    @Length(6, 100)
    password: string

    @IsString()
    @IsNotEmpty()
    confirm_password: string;

    @IsString()
    @IsOptional()
    role: 'SUPERADMIN' | 'CLIENT' | 'MEMBER'
}
