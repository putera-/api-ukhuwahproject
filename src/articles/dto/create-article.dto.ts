import { IsDate, IsISO8601, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateArticleDto {
    @IsString()
    @Length(1, 100)
    title: string;

    @IsString()
    @MinLength(1)
    content: string;

    @IsString()
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISH';

    @IsISO8601()
    @IsOptional()
    publishedAt?: Date;
}