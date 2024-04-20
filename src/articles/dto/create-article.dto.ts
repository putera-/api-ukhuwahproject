import { IsISO8601, IsOptional, IsString, Length } from "class-validator";

export class CreateArticleDto {
    @IsString()
    @Length(1, 100)
    title: string;

    @IsString()
    content: string;

    @IsString()
    @IsOptional()
    youtubeId: string;

    @IsString()
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISH';

    @IsISO8601()
    @IsOptional()
    publishedAt?: Date;
}
