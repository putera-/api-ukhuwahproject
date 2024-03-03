import { Injectable } from '@nestjs/common';
import { CreateBlogCategoryDto } from './dto/create-blog_category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog_category.dto';
import { BlogCategory } from './blog_categories.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogCategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(title: string): Promise<BlogCategory> {
    title = title.trim();
    return this.prisma.blogCategory.create({
      data: { title }
    });
  }

  async findAll(): Promise<BlogCategory[]> {
    return this.prisma.blogCategory.findMany({
      where: {
        Blog: {
          some: { deleted: false }
        }
      }
    });
  }

  async findOne(title: string): Promise<BlogCategory> {
    return this.prisma.blogCategory.findFirst({
      where: { title }
    });
  }

  update(id: number, updateBlogCategoryDto: UpdateBlogCategoryDto) {
    return `This action updates a #${id} blogCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogCategory`;
  }
}
