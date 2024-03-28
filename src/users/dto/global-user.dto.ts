import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Length } from "class-validator"

export class GlobalUserDto {
    @IsString()
    @Length(1, 100)
    name: string

    @IsEmail()
    email: string

    @IsString()
    @Length(6, 100)
    password: string

    @IsPhoneNumber()
    @Length(1, 20)
    phone: string;

    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
