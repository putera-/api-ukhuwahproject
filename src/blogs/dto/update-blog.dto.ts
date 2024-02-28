import { IsString, Length } from "class-validator";

export class UpdateBlogDto {
    @IsString()
    @Length(3, 100)
    title?: string;

    @IsString()
    content?: string;
}