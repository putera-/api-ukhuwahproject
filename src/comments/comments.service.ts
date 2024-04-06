import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { Comment } from './comments.interface';
import { CommentReply, Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
    constructor(
        private prisma: PrismaService
    ) { }


    async create(data: Prisma.CommentCreateInput): Promise<Comment> {
        const userId = data.commenter.connect.id;

        return this.prisma.comment.create({
            data,
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
                        commenter: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                avatar_md: true
                            }
                        },
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
            }
        });
    }

    async createCommentReply(data: Prisma.CommentReplyCreateInput): Promise<CommentReply> {
        const userId = data.commenter.connect.id;

        return this.prisma.commentReply.create({
            data,
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
                _count: { select: { likes: true } }
            }
        });
    }

    //   findAll() {
    //     return `This action returns all comments`;
    //   }

    async loadByArticle(articleId: string, page: string = '1', userId: string = ''): Promise<Comment[]> {
        const skip = (Number(page) - 1) * 5;

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
                        commenter: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                avatar_md: true
                            }
                        },
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
            take: 5
        })
    }

    async loadByItikaf(itikafId: string, page: string = '1', userId: string = ''): Promise<Comment[]> {
        const skip = (Number(page) - 1) * 5;

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
                        commenter: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                avatar_md: true
                            }
                        },
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
            take: 5
        })
    }

    async loadByItikafSchedule(itikafScheduleId: string, page: string = '1', userId: string = ''): Promise<Comment[]> {
        const skip = (Number(page) - 1) * 5;

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
                        commenter: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                avatar_md: true
                            }
                        },
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
            take: 5
        })
    }
    async loadReply(commentId: string, page: string = '1', userId: string = ''): Promise<Comment[]> {
        const skip = (Number(page) - 1) * 5;

        return this.prisma.commentReply.findMany({
            where: {
                commentId,
                deleted: false,
            },
            orderBy: { createdAt: 'desc' },
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
                _count: { select: { likes: true } }
            },
            skip,
            take: 5
        })
    }

    //   update(id: number, updateCommentDto: UpdateCommentDto) {
    //     return `This action updates a #${id} comment`;
    //   }

    async removeComment(id: string): Promise<void> {
        await this.prisma.comment.update({
            where: { id },
            data: { deleted: true }
        });
        return;
    }

    async removeCommentReply(id: string): Promise<void> {
        await this.prisma.commentReply.update({
            where: { id },
            data: { deleted: true }
        });
        return;
    }
}
