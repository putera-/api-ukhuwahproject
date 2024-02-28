import { IsString, Length, Max, Min } from "class-validator";

export class CreateBlogDto {
    @IsString()
    id: string;

    @IsString()
    @Length(3, 100)
    title: string;

    @IsString()
    content: string;
}