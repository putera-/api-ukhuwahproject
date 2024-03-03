import { IsString, Length } from 'class-validator';

export class UpdateClientDto {
    @IsString()
    @Length(1, 100)
    name: string;
}
