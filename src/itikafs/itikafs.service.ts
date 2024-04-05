import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItikafDto } from './dto/create-itikaf.dto';
import { UpdateItikafDto } from './dto/update-itikaf.dto';
import { PrismaService } from 'src/prisma.service';
import { Itikaf } from './itikafs.interface';
import { Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';

@Injectable()
export class ItikafsService {
    constructor(
        private prisma: PrismaService,
        private appService: AppService
    ) { }

    async create(data: Prisma.ItikafCreateInput)
        : Promise<Itikaf> {

        const checkData = await this.prisma.itikaf.findFirst({
            where: { hijri_year: data.hijri_year }
        });


        // if data is exist
        if (checkData) {
            // remove if photo if exist
            if (checkData.photo) {
                this.appService.removeFile('/public' + checkData.photo);
            }
        }

        if (!data.photo) data.photo = null;

        return this.prisma.itikaf.upsert({
            where: { hijri_year: data.hijri_year },
            create: data,
            update: data,
            include: {
                createdBy: true
            }
        });

    }

    async findAll(): Promise<Itikaf[]> {
        return this.prisma.itikaf.findMany();
    }

    async findOne(hijri_year: string, userId: string = ''): Promise<Itikaf> {
        return this.prisma.itikaf.findUnique({
            where: { hijri_year },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        avatar_md: true
                    }
                },
                comments: {
                    where: { deleted: false },
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
                                replies: true
                            }
                        },
                        likes: {
                            where: { userId }
                        }
                    },
                    take: 1
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                },
                likes: {
                    where: { userId }
                }
            }
        });
    }

    async update(hijri_year: string, data: Prisma.ItikafUpdateInput) {
        const current_data: Itikaf = await this.findOne(hijri_year);

        if (!current_data) throw new NotFoundException();

        const updatedItikaf = await this.prisma.itikaf.update({
            where: { hijri_year },
            data,
            include: { createdBy: true }
        });
        if (current_data.photo != updatedItikaf.photo) {
            this.appService.removeFile('/public' + current_data.photo);
            this.appService.removeFile('/public' + current_data.photo_sm);
        }

        return updatedItikaf;
    }

    async updateActive(hijri_year: string, active: boolean): Promise<void> {
        const current_data = await this.findOne(hijri_year);

        if (!current_data) throw new NotFoundException();


        await this.prisma.itikaf.update({
            where: { hijri_year },
            data: { active }
        });
    }
}
