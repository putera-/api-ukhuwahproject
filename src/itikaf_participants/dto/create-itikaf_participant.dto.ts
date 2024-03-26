import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator"

export class CreateItikafParticipantDto {
    @IsInt()
    @Min(0)
    total_member: number

    @IsInt()
    @Min(0)
    man: number

    @IsInt()
    @Min(0)
    woman: number

    @IsString()
    @IsOptional()
    vehicle_no: string

    @IsIn(['Motor', 'Mobil'])
    @IsOptional()
    vehicle_type: 'Motor' | 'Mobil'
}
