import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { Course } from './courses.interface';
import { Prisma } from '@prisma/client';
import { CourseCategory } from 'src/course_categories/course_categories.interface';
import { CourseCategoriesService } from 'src/course_categories/course_categories.service';

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private courseCategoryService: CourseCategoriesService,
    private appService: AppService
  ) { }

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({ data });
  }

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: { deleted: false },
      orderBy: { title: 'asc' },
      include: {
        category: true
      }
    })
  }

  async findAllPublish(): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: {
        deleted: false,
        status: 'PUBLISH',
        publishAt: {
          lt: new Date()
        }
      },
      orderBy: { title: 'asc' },
      include: {
        category: true
      }
    })
  }

  async findAllDraft(): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: {
        deleted: false,
        status: 'DRAFT'
      },
      orderBy: { title: 'asc' },
      include: {
        category: true
      }
    })
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
        deleted: false,
        status: 'PUBLISH',
        publishAt: { lt: new Date() }
      },
      include: {
        category: true
      }
    });

    if (!course) throw new NotFoundException();

    return course;
  }

  async update(id: string, data: Prisma.CourseUpdateInput): Promise<Course> {
    const currentData = await this.prisma.course.findUnique({ where: { id } });
    if (!currentData) throw new NotFoundException();

    const updatedData = await this.prisma.course.update({
      where: { id, deleted: false },
      data,
    });

    if (currentData.thumbnail != updatedData.thumbnail) {
      // photo has been change
      // remove old photo
      this.appService.removeFile(currentData.thumbnail);
      this.appService.removeFile(currentData.thumbnail_md);
    }

    return updatedData;
  }

  async remove(id: string): Promise<void> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException();

    await this.prisma.course.update({
      where: { id },
      data: { deleted: true }
    });

    return;
  }

  async getCategory(title: string): Promise<CourseCategory> {
    // get category id
    let category = await this.courseCategoryService.findOne(title);
    if (!category) {
      // create if null
      category = await this.courseCategoryService.create(title);
    }

    return category;
  }
}
