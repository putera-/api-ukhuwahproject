import { Injectable } from '@nestjs/common';
import { CreateCourseCategoryDto } from './dto/create-course_category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course_category.dto';
import { CourseCategory } from './course_categories.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseCategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(title: string): Promise<CourseCategory> {
    title = title.trim();
    return this.prisma.courseCategory.create({
      data: { title }
    });
  }

  async findAll(): Promise<CourseCategory[]> {
    return this.prisma.courseCategory.findMany({
      where: {
        course: {
          some: { deleted: false }
        }
      }
    });;
  }

  async findOne(title: string): Promise<CourseCategory> {
    return this.prisma.courseCategory.findFirst({
      where: { title }
    });
  }

  // update(id: number, updateCourseCategoryDto: UpdateCourseCategoryDto) {
  //   return `This action updates a #${id} courseCategory`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} courseCategory`;
  // }
}
