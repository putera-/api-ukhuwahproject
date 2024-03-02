import { IntersectionType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";
import { GlobalUserDto } from "src/users/dto/global-user.dto";

export class CreateUserStaffDto extends IntersectionType(GlobalUserDto) {
    @IsString()
    @IsOptional()
    role: 'STAFF'
}
