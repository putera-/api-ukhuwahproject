import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from 'src/articles/articles.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { Prisma } from '@prisma/client';
import { contains } from 'class-validator';
import { Pagination } from 'src/app.interface';

@Injectable()
export class ArticlesService {
    constructor(
        private prisma: PrismaService,
        private appService: AppService
    ) { }

    async create(data: Prisma.ArticleCreateInput, photos: Prisma.PhotoCreateInput[]): Promise<Article> {
        return this.prisma.article.create({
            data: {
                ...data,
                photos: { create: photos }
            },
            include: {
                author: true,
                photos: true
            }
        });
    }

    async findAll(search = '', page = '1', limit = '10'): Promise<Pagination<Article[]>> {
        const skip = (Number(page) - 1) * Number(limit);

        const [total, data] = await Promise.all([
            this.prisma.article.count({
                where: {
                    deleted: false,
                    title: {
                        contains: search
                    }
                }
            }),
            this.prisma.article.findMany({
                where: {
                    deleted: false,
                    title: {
                        contains: search
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            avatar_md: true
                        }
                    },
                    photos: {
                        orderBy: { index: 'asc' }
                    },
                    _count: {
                        select: {
                            likes: true,
                            comments: { where: { deleted: false } }
                        }
                    }
                },
                skip,
                take: Number(limit)
            })
        ]);


        return {
            data,
            total,
            page: Number(page),
            limit: Number(limit),
            maxPage: Math.ceil(total / Number(limit))
        }
    }

    async findAllPublished(search = '', page = '1', limit = '10', userId: string = ''): Promise<Pagination<Article[]>> {
        const skip = (Number(page) - 1) * Number(limit);

        const [total, data] = await Promise.all([
            this.prisma.article.count({
                where: {
                    deleted: false,
                    status: "PUBLISH",
                    title: {
                        contains: search
                    }
                }
            }),
            this.prisma.article.findMany({
                where: {
                    deleted: false,
                    status: "PUBLISH",
                    publishedAt: {
                        lt: new Date()
                    }
                },
                orderBy: {
                    publishedAt: 'desc'
                },
                include: {
                    likes: {
                        where: { userId }
                    },
                    author: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            avatar_md: true
                        }
                    },
                    photos: {
                        orderBy: { index: 'asc' }
                    },
                    // comments: {
                    //     where: { deleted: false },
                    //     orderBy: { createdAt: 'desc' },
                    //     include: {
                    //         commenter: {
                    //             select: {
                    //                 id: true,
                    //                 name: true,
                    //                 avatar: true,
                    //                 avatar_md: true
                    //             }
                    //         },
                    //         replies: {
                    //             where: { deleted: false },
                    //             include: {
                    //                 commenter: {
                    //                     select: {
                    //                         id: true,
                    //                         name: true,
                    //                         avatar: true,
                    //                         avatar_md: true
                    //                     }
                    //                 },
                    //                 _count: { select: { likes: true } }
                    //             },
                    //             orderBy: { createdAt: 'desc' },
                    //             take: 2
                    //         },
                    //         _count: {
                    //             select: {
                    //                 likes: true,
                    //                 replies: { where: { deleted: false } }
                    //             }
                    //         }
                    //     },
                    //     take: 3
                    // },
                    _count: {
                        select: {
                            likes: true,
                            comments: { where: { deleted: false } }
                        }
                    }
                },
                skip,
                take: Number(limit)
            })
        ]);

        return {
            data,
            total,
            page: Number(page),
            limit: Number(limit),
            maxPage: Math.ceil(total / Number(limit))
        }
    }

    async findAllDraft(): Promise<Article[]> {
        return this.prisma.article.findMany({
            where: {
                deleted: false,
                status: "DRAFT"
            },
            orderBy: {
                publishedAt: 'desc'
            },
            include: {
                author: true,
                photos: {
                    orderBy: { index: 'asc' }
                }
            }
        });
    }

    async findOne(id: string, userId: string = ''): Promise<Article> {
        const article = await this.prisma.article.findUnique({
            where: {
                id,
                deleted: false,
            },
            include: {
                likes: {
                    where: { userId }
                },
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        avatar_md: true
                    }
                },
                photos: {
                    orderBy: { index: 'asc' }
                },
                // comments: {
                //     where: { deleted: false },
                //     orderBy: { createdAt: 'desc' },
                //     include: {
                //         likes: {
                //             where: { userId }
                //         },
                //         commenter: {
                //             select: {
                //                 id: true,
                //                 name: true,
                //                 avatar: true,
                //                 avatar_md: true
                //             }
                //         },
                //         replies: {
                //             where: { deleted: false },
                //             include: {
                //                 likes: {
                //                     where: { userId }
                //                 },
                //                 commenter: {
                //                     select: {
                //                         id: true,
                //                         name: true,
                //                         avatar: true,
                //                         avatar_md: true
                //                     }
                //                 },
                //                 _count: { select: { likes: true } }
                //             },
                //             orderBy: { createdAt: 'desc' },
                //             take: 1
                //         },
                //         _count: {
                //             select: {
                //                 likes: true,
                //                 replies: { where: { deleted: false } }
                //             }
                //         }
                //     },
                //     take: 2
                // },
                _count: {
                    select: {
                        likes: true,
                        comments: { where: { deleted: false } }
                    }
                }
            }
        });
        if (!article) throw new NotFoundException();

        return article;
    }

    async findPublished(id: string, userId: string = ''): Promise<Article> {
        const article = await this.prisma.article.findUnique({
            where: {
                id,
                deleted: false,
                status: 'PUBLISH',
                publishedAt: { lt: new Date() }
            },
            include: {
                likes: {
                    where: { userId }
                },
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        avatar_md: true
                    }
                },
                photos: {
                    orderBy: { index: 'asc' }
                },
                comments: {
                    where: { deleted: false },
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
                        replies: {
                            where: { deleted: false },
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
                            orderBy: { createdAt: 'desc' },
                            take: 1
                        },
                        _count: {
                            select: {
                                likes: true,
                                replies: { where: { deleted: false } }
                            }
                        }
                    },
                    take: 2
                },
                _count: {
                    select: {
                        likes: true,
                        comments: { where: { deleted: false } }
                    }
                }
            }
        });
        if (!article) throw new NotFoundException();

        return article;
    }

    async findOneDraft(id: string): Promise<Article> {
        const article = await this.prisma.article.findUnique({
            where: {
                id,
                deleted: false,
                status: 'DRAFT'
            },
            include: {
                author: true,
                photos: {
                    orderBy: { index: 'asc' }
                },
            }
        });
        if (!article) throw new NotFoundException();

        return article;
    }

    async update(id: string, data: any, new_photos: Prisma.PhotoCreateInput[]): Promise<Article> {
        const current_article = await this.prisma.article.findUnique({
            where: { id, deleted: false },
            include: { photos: true }
        });
        if (!current_article) throw new NotFoundException();

        // if no photo from req data
        const keptPhotos: Record<string, any> = data.photos ? data.photos : [];
        // collect data photos to update
        const photosUpdate = keptPhotos.map(p => ({
            where: { id: p.id },
            data: { index: parseInt(p.index) }
        }));

        const keepedIds = keptPhotos.map(p => p.id);
        const keepedIndexes = keptPhotos.map(p => parseInt(p.index));

        // get taken index
        const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        // get available index
        const availableIndexes = indexes.filter(i => !keepedIndexes.includes(i));

        // update new photo indexes
        new_photos = new_photos.map(p => {
            p.index = availableIndexes[0];
            availableIndexes.shift();
            return p;
        });

        // remove photos from req.data
        if (data.photos) delete data.photos;

        const updatedArticle = await this.prisma.article.update({
            where: { id, deleted: false },
            data: {
                ...data,
                photos: {
                    update: photosUpdate,
                    deleteMany: {
                        id: {
                            notIn: keepedIds
                        }
                    },
                    create: new_photos
                }
            },
            include: {
                author: true,
                photos: {
                    orderBy: { index: 'asc' }
                }
            }
        });

        // collect unused photo
        const photo_to_delete = current_article.photos.filter(p => !keepedIds.includes(p.id));
        // deleted unused photo files
        this.removePhotos(photo_to_delete);

        return updatedArticle;
    }

    async publishNow(id: string): Promise<void> {
        const article = await this.prisma.article.findUnique({ where: { id } });
        if (!article) throw new NotFoundException();

        await this.prisma.article.update({
            where: { id },
            data: {
                publishedAt: new Date(),
                status: 'PUBLISH'
            }
        });
        return;
    }

    async remove(id: string): Promise<void> {
        const article = await this.prisma.article.findUnique({ where: { id } });
        if (!article) throw new NotFoundException();

        await this.prisma.article.update({
            where: { id },
            data: { deleted: true }
        });

        return;
    }

    removePhotos(photos) {
        for (const photo of photos) {
            this.appService.removeFile('/public' + photo.path);
            this.appService.removeFile('/public' + photo.path_md);
        }
    };
}
