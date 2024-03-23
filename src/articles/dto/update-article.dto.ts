import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsBoolean, IsOptional } from "class-validator";
import { CreateArticleDto } from "./create-article.dto";

interface updateAPhotoDto {
    id: string
    index: number
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @IsBoolean()
    @IsOptional()
    deleted: boolean

    @IsArray()
    @IsOptional()
    photos: updateAPhotoDto[]
}