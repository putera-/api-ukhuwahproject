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
      where: { date: data.date, deleted: false }
    });

    if (!currentDataDate) {
      return this.prisma.itikafSchedule.create({
        data: {
          ...data
        },
        include: {
          imam_tarawih: true,
          imam_qiyamul_lail: true,
          ustadz_kajian: true
        }
      });
    } else {
      const updatedData = await this.prisma.itikafSchedule.update({
        where: { id: currentDataDate.id },
        data,
        include: {
          imam_tarawih: true,
          imam_qiyamul_lail: true,
          ustadz_kajian: true
        }
      });

      // FIXME REMOVE SINGLE OLD PHOTO
      // this.removePhotos(currentDataDate.photos);

      return updatedData;
    }
  }

  async findAll(authUserId?: string): Promise<ItikafSchedule[]> {
    const data: ItikafSchedule[] = await this.prisma.itikafSchedule.findMany({
      where: { deleted: false },
      orderBy: { day_index: 'asc' },
      include: {
        imam_tarawih: true,
        imam_qiyamul_lail: true,
        ustadz_kajian: true,
        participants: {
          where: {
            participate: true
          }
        }
      },
    });

    for (const schedule of data) {
      schedule.total_member = schedule.participants.reduce((acc, p) => acc + p.total_member, 0);
      schedule.total_man = schedule.participants.reduce((acc, p) => acc + p.man, 0);
      schedule.total_woman = schedule.participants.reduce((acc, p) => acc + p.woman, 0);

      if (authUserId) {
        schedule.auth_participant = schedule.participants.some(p => p.userId == authUserId);
      }
    }

    return data;
  }

  async findOne(id: string): Promise<ItikafSchedule> {
    const schedule = await this.prisma.itikafSchedule.findUnique({
      where: { id, deleted: false },
      include: {
        imam_tarawih: true,
        imam_qiyamul_lail: true,
        ustadz_kajian: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                avatar_md: true,
                role: true
              }
            }
          }
        }
      }
    });

    if (!schedule) throw new NotFoundException();

    return schedule;
  }

  async update(id: string, data: Record<string, any>, new_photos: Prisma.PhotoCreateInput[]): Promise<ItikafSchedule> {
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
      data,
      include: {
        imam_tarawih: true,
        imam_qiyamul_lail: true,
        ustadz_kajian: true
      }
    });

    // FIXME REMOVE SINGLE PHOTO
    // collect unused photo
    // const photo_to_delete = current_data.photos.filter(p => !keepedIds.includes(p.id));
    // deleted unused photo files
    // this.removePhotos(photo_to_delete);

    return updatedData;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.itikafSchedule.update({
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
