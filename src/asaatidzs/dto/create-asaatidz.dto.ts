import { IsString } from "class-validator";

export class CreateAsaatidzDto {
    @IsString()
    name: string

    @IsString()
    profile: string
}
