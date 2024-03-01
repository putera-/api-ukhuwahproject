import { IntersectionType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator"
import { GlobalUserDto } from "./global-user.dto";

export class CreateUserDto extends IntersectionType(GlobalUserDto) {
    @IsString()
    @IsOptional()
    role: 'ADMIN' | 'MEMBER'
}
