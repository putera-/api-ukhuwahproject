import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { Comment } from './comments.interface';

@Injectable()
export class CommentsService {
    constructor(
        private prisma: PrismaService
    ) { }


    //   create(createCommentDto: CreateCommentDto) {
    //     return 'This action adds a new comment';
    //   }

    //   findAll() {
    //     return `This action returns all comments`;
    //   }

    async find(articleId: string, page: string = '1'): Promise<Comment[]> {
        const skip = (Number(page) - 1) * 10;

        return [];

        // return this.prisma.comment.findMany({
        //     where: { articleId }
        // });
    }

    //   update(id: number, updateCommentDto: UpdateCommentDto) {
    //     return `This action updates a #${id} comment`;
    //   }

    //   remove(id: number) {
    //     return `This action removes a #${id} comment`;
    //   }
}
