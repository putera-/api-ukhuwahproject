import { IsDate, IsISO8601, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @Length(1, 100)
    title: string;

    @IsString()
    @MinLength(1)
    content: string;

    @IsString()
    @Length(1, 50)
    category: string;

    @IsString()
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISH';

    @IsISO8601()
    @IsOptional()
    publishAt?: Date;
}