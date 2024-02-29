import { IsBoolean, IsString, Length, MinLength } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @Length(1, 100)
    title: string;

    @IsString()
    @MinLength(1)
    content: string;
}