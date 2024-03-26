import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsBoolean, IsOptional } from "class-validator";
import { CreateArticleDto } from "./create-article.dto";

interface updatePhotoDto {
    id: string
    index: number
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @IsArray()
    photos: updatePhotoDto[]
}