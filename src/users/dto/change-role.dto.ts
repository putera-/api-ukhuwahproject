import { IsEnum } from "class-validator";

enum AvailableRole {
    ADMIN = 'ADMIN',
    STAFF = 'STAFF',
    MEMBER = 'MEMBER',
}

export class ChangeRoleDto {
    @IsEnum(AvailableRole)
    role: AvailableRole;
}