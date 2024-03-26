import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { Slide } from './slides.interface';
import { AppService } from 'src/app.service';

@Injectable()
export class SlidesService {
  constructor(
    private prisma: PrismaService,
    private appService: AppService
  ) { }

  async create(photos: string[]): Promise<Slide[]> {
    const slides: Slide[] = [];

    for (const photo of photos) {
      const slide = await this.prisma.slide.create({
        data: {
          path: photo
        }
      });

      slides.push(slide);
    }

    return slides;
  }

  findAll() {
    return this.prisma.slide.findMany();
  }

  async findOne(id: string): Promise<Slide> {
    const slide = await this.prisma.slide.findUnique({ where: { id } });

    if (!slide) throw new NotFoundException();

    return slide;
  }

  async remove(id: string): Promise<void> {
    const slide = await this.findOne(id);
    await this.prisma.slide.delete({
      where: { id }
    });

    this.appService.removeFile('/public' + slide.path);
    return;
  }
}
