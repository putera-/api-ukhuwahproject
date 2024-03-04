import { IsISO8601, IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @Length(1, 100)
    title: string

    @IsNumber()
    @IsPositive()
    price: number

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
