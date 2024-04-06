import { IsString, MinLength } from "class-validator";

export class CreateCommentReplyDto {
    @IsString()
    @MinLength(1)
    comment: string
}
