import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItikafScheduleDto } from './dto/create-itikaf_schedule.dto';
import { UpdateItikafScheduleDto } from './dto/update-itikaf_schedule.dto';
import { PrismaService } from 'src/prisma.service';
import { Itikaf } from 'src/itikafs/itikafs.interface';
import { Prisma } from '@prisma/client';
import { ItikafSchedule } from './itikaf_schedules.interface';
import { AppService } from 'src/app.service';

@Injectable()
export class ItikafSchedulesService {

  constructor(
    private prisma: PrismaService,
    private appService: AppService
  ) { }

  async create(data: Prisma.ItikafScheduleCreateInput, photos: Prisma.PhotoCreateInput[]): Promise<ItikafSchedule> {
    const currentDataDate = await this.prisma.itikafSchedule.findFirst({
      where: { date: data.date, deleted: false },
      include: { photos: true }
    });

    if (!currentDataDate) {
      return this.prisma.itikafSchedule.create({
        data: {
          ...data,
          photos: { create: photos }
        },
        include: { photos: true }
      });
    } else {
      const updatedData = await this.prisma.itikafSchedule.update({
        where: { id: currentDataDate.id },
        data: {
          ...data,
          photos: {
            deleteMany: {},
            create: photos
          }
        },
        include: { photos: true }
      });

      this.removePhotos(currentDataDate.photos);

      return updatedData;
    }
  }

  async findAll(): Promise<ItikafSchedule[]> {
    return this.prisma.itikafSchedule.findMany({
      where: { deleted: false },
      include: { photos: true }
    });
  }

  async findOne(id: string): Promise<ItikafSchedule> {
    const schedule = await this.prisma.itikafSchedule.findUnique({ where: { id, deleted: false }, include: { photos: true } });

    if (!schedule) throw new NotFoundException();

    return schedule;
  }

  async update(id: string, data: Prisma.ItikafScheduleUpdateInput, new_photos: Prisma.PhotoCreateInput[]): Promise<ItikafSchedule> {
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

    const updatedData = await this.prisma.itikafSchedule.update({
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
      include: { photos: true }
    });

    // collect unused photo
    const photo_to_delete = current_data.photos.filter(p => !keepedIds.includes(p.id));
    // deleted unused photo files
    this.removePhotos(photo_to_delete);

    return updatedData;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.itikafSchedule.update({
      where: { id },
      data: { deleted: true }
    })
    return;
  }

  removePhotos(photos) {
    for (const photo of photos) {
      this.appService.removeFile('/public' + photo.path);
      this.appService.removeFile('/public' + photo.path_md);
    }
  };
}
