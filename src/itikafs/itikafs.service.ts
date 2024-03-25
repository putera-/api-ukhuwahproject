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

    async create(data: Prisma.ItikafCreateInput, photos: Prisma.PhotoCreateInput[])
        : Promise<Itikaf> {
        return this.prisma.itikaf.upsert({
            where: { hijri_year: data.hijri_year },
            create: {
                ...data,
                photos: { create: photos }
            },
            update: {
                ...data,
                photos: { create: photos }
            },
            include: {
                photos: true,
                createdBy: true
            }

        });
    }

    async findAll(): Promise<Itikaf[]> {
        return this.prisma.itikaf.findMany();
    }

    async findOne(hijri_year: string): Promise<Itikaf> {
        const itikaf = await this.prisma.itikaf.findUnique({
            where: { hijri_year },
            include: { photos: true, createdBy: true }
        });

        if (!itikaf) throw new NotFoundException();

        return itikaf;
    }

    async update(id: string, data: Prisma.ItikafUpdateInput, new_photos: Prisma.PhotoCreateInput[]) {
        const current_data = await this.findOne(id);

        // if no photo from req data
        const keptPhotos: Record<string, any> = data.photos ? data.photos : [];
        // collect data photos to update
        const photosUpdate = keptPhotos.map(p => ({
            where: { id: p.id },
            data: { index: parseInt(p.index) }
        }));

        const keepedIds = keptPhotos.map(p => p.id);
        const keepedIndexes = keptPhotos.map(p => p.index);

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

        const updatedItikaf = await this.prisma.itikaf.update({
            where: { id },
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
                createdBy: true,
                photos: true
            }
        });

        // collect unused photo
        const photo_to_delete = current_data.photos.filter(p => !keepedIds.includes(p.id));
        // deleted unused photo files
        this.removePhotos(photo_to_delete);

        return updatedItikaf;
    }

    remove(id: string) {
        this.findOne(id);
        return `This action removes a #${id} itikaf`;
    }

    removePhotos(photos) {
        for (const photo of photos) {
            this.appService.removeFile(photo.path);
            this.appService.removeFile(photo.path_md);
        }
    };

    async updateActive(id: string, active: boolean): Promise<void> {
        await this.prisma.itikaf.update({
            where: { id },
            data: { active }
        })
    }
}
