import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CreateBlogDto } from "./create-blog.dto";

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
    @IsBoolean()
    @IsOptional()
    deleted: boolean
}