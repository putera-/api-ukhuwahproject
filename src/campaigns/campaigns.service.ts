import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign, Transaction } from './campaigns.interface';
import { Pagination } from 'src/app.interface';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CampaignsService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(data: Prisma.CampaignCreateInput, photos: Prisma.PhotoCreateInput[]): Promise<Campaign> {
        return this.prisma.campaign.create({
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

    async findAll(search = '', page = '1', limit = '10'): Promise<Pagination<Campaign[]>> {
        const skip = (Number(page) - 1) * Number(limit);

        const [total, data] = await Promise.all([
            this.prisma.campaign.count({
                where: {
                    active: true,
                    title: {
                        contains: search
                    }
                }
            }),
            this.prisma.campaign.findMany({
                where: {
                    active: true,
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

    async findAllPublished(search = '', page = '1', limit = '10', userId: string = ''): Promise<Pagination<Campaign[]>> {
        const skip = (Number(page) - 1) * Number(limit);

        const [total, data] = await Promise.all([
            this.prisma.campaign.count({
                where: {
                    active: true,
                    publishedAt: {
                        lt: new Date()
                    },
                    title: {
                        contains: search
                    }
                }
            }),
            this.prisma.campaign.findMany({
                where: {
                    active: true,
                    publishedAt: {
                        lt: new Date()
                    },
                    title: {
                        contains: search
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

    async findOne(id: string): Promise<Campaign> {
        const campaign = await this.prisma.campaign.findUnique({ where: { id } });

        if (!campaign) throw new NotFoundException();
        return campaign;
    }

    async findByTransaction(transactionId: string): Promise<Transaction> {
        return this.prisma.transaction.findUnique({
            where: { id: transactionId },
            include: {
                Donation: {
                    include: {
                        Campaign: {
                            include: {
                                photos: true,
                                donations: {
                                    where: { status: 'settlement' },
                                    orderBy: { paidAt: 'desc' },
                                    take: 5,
                                    include: {
                                        User: {
                                            select: { id: true, name: true }
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        });
    }

    async findPublished(id: string, userId: string = ''): Promise<Campaign> {
        const campaign = await this.prisma.campaign.findUnique({
            where: {
                id,
                active: true,
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
                donations: {
                    where: { status: 'settlement' },
                    orderBy: { paidAt: 'desc' },
                    take: 5,
                    include: {
                        User: {
                            select: { id: true, name: true }
                        }
                    }
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
                        comments: { where: { deleted: false } },
                        donations: { where: { status: 'settlement' } }
                    }
                }
            }
        });
        if (!campaign) throw new NotFoundException();

        for (const donation of campaign.donations) {
            donation.User.name = donation.User.name.substring(0, 2) + "*".repeat(Math.min(3, donation.User.name.length - 2));
        }

        return campaign;
    }

    async calculateDonation(campaignId: string): Promise<void> {
        const donations = await this.prisma.donation.aggregate({
            where: { campaignId },
            _sum: { gross_amount: true }
        });

        await this.prisma.campaign.update({
            where: { id: campaignId },
            data: {
                collected_amount: donations._sum.gross_amount
            }
        });

        return;
    }

    update(id: number, updateCampaignDto: UpdateCampaignDto) {
        return `This action updates a #${id} campaign`;
    }

    remove(id: number) {
        return `This action removes a #${id} campaign`;
    }
}
