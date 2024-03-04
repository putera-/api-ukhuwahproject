import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CreateBlogDto } from "./create-blog.dto";

interface updateBlogPhotos {
    id: string
    index: number
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
    @IsBoolean()
    @IsOptional()
    deleted: boolean

    @IsArray()
    @IsOptional()
    photos: updateBlogPhotos[]
}