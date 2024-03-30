import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class UpdateClientDto {
    @IsString()
    @Length(1, 100)
    @IsOptional()
    name: string;

    @IsString()
    @Length(1, 20)
    @IsOptional()
    nick: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    slogan: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    phone: string

    @IsString()
    @MaxLength(100)
    @IsOptional()
    youtube: string

    @IsString()
    @MaxLength(100)
    @IsOptional()
    instagram: string

    @IsString()
    @MaxLength(100)
    @IsOptional()
    facebook: string

    @IsString()
    @MaxLength(100)
    @IsOptional()
    twitter: string
}