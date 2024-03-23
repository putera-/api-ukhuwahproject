import { IsString, Length, MaxLength } from 'class-validator';

export class UpdateClientDto {
    @IsString()
    @Length(1, 100)
    name: string;

    @IsString()
    @Length(1, 20)
    nick: string;

    @IsString()
    @MaxLength(255)
    slogan: string;

    @IsString()
    address: string;

    @IsString()
    @MaxLength(255)
    phone: string

    @IsString()
    @MaxLength(255)
    youtube: string

    @IsString()
    @MaxLength(255)
    instagram: string

    @IsString()
    @MaxLength(255)
    facebook: string

    @IsString()
    @MaxLength(255)
    twitter: string
}
