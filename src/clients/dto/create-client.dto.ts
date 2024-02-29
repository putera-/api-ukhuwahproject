import { IsString, Length } from "class-validator";

export class CreateClientDto {
    @IsString()
    @Length(1, 100)
    name: string;
}
