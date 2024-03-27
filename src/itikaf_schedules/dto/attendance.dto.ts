import { IsInt, Min } from "class-validator"

export class AttendanceItikafParticipantDto {
    @IsInt()
    @Min(0)
    man: number

    @IsInt()
    @Min(0)
    woman: number
}
