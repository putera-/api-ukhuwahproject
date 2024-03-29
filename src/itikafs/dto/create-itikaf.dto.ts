import { IsBoolean, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateItikafDto {
    @IsString()
    @MinLength(1)
    description: string

    @IsString()
    @IsOptional()
    contact_person_name?: string

    @IsPhoneNumber()
    @IsOptional()
    contact_person_phone?: string
}
