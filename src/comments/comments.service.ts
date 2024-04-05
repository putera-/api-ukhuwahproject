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

    async loadByArticle(articleId: string, page: string = '1', userId: string = ''): Promise<Comment[]> {
        const skip = (Number(page) - 1) * 10;

        return this.prisma.comment.findMany({
            where: {
                articleId,
                deleted: false,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                likes: {
                    where: { userId }
                },
                commenter: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        avatar_md: true
                    }
                },
                replies: {
                    include: {
                        likes: {
                            where: { userId }
                        },
                        commenter: true,
                        _count: { select: { likes: true } }
                    },
                    take: 1
                },
                _count: {
                    select: {
                        likes: true,
                        replies: true
                    }
                }
            },
            skip,
            take: 10
        })
    }

    async loadByItikaf(itikafId: string, page: string = '1', userId: string = ''): Promise<Comment[]> {
        const skip = (Number(page) - 1) * 10;

        return this.prisma.comment.findMany({
            where: {
                itikafId,
                deleted: false,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                commenter: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        avatar_md: true
                    }
                },
                replies: {
                    include: {
                        likes: {
                            where: { userId }
                        },
                        commenter: true,
                        _count: { select: { likes: true } }
                    },
                    take: 1
                },
                _count: {
                    select: {
                        likes: true,
                        replies: true
                    }
                },
                likes: {
                    where: { userId }
                }
            },
            skip,
            take: 10
        })
    }

    async loadByItikafSchedule(itikafScheduleId: string, page: string = '1', userId: string = ''): Promise<Comment[]> {
        const skip = (Number(page) - 1) * 10;

        return this.prisma.comment.findMany({
            where: {
                itikafScheduleId,
                deleted: false,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                commenter: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        avatar_md: true
                    }
                },
                replies: {
                    include: {
                        likes: {
                            where: { userId }
                        },
                        commenter: true,
                        _count: { select: { likes: true } }
                    },
                    take: 1
                },
                _count: {
                    select: {
                        likes: true,
                        replies: true
                    }
                },
                likes: {
                    where: { userId }
                }
            },
            skip,
            take: 10
        })
    }

    //   update(id: number, updateCommentDto: UpdateCommentDto) {
    //     return `This action updates a #${id} comment`;
    //   }

    //   remove(id: number) {
    //     return `This action removes a #${id} comment`;
    //   }
}
