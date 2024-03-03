import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from 'src/blogs/blogs.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { BlogCategory, Prisma } from '@prisma/client';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogCategoriesService } from 'src/blog_categories/blog_categories.service';

@Injectable()
export class BlogsService {
    constructor(
        private prisma: PrismaService,
        private blogCategoryService: BlogCategoriesService,
    ) { }

    async create(data: Prisma.BlogCreateInput): Promise<Blog> {
        return await this.prisma.blog.create({
            data,
            include: {
                author: true,
                category: true
            }
        });
    }

    async findAll(): Promise<Blog[]> {
        return this.prisma.blog.findMany({
            where: { deleted: false },
            include: {
                author: true,
                category: true
            }
        });
    }

    async findOne(id: string): Promise<Blog> {
        const blog = await this.prisma.blog.findUnique({
            where: { id, deleted: false },
            include: {
                author: true,
                category: true
            }
        });
        if (!blog) throw new NotFoundException();

        return blog;
    }

    async update(id: string, data: Prisma.BlogUpdateInput): Promise<Blog> {
        await this.findOne(id);

        return this.prisma.blog.update({
            where: { id, deleted: false },
            data,
            include: {
                author: true,
                category: true
            }
        });
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);

        await this.prisma.blog.update({
            where: { id },
            data: { deleted: true }
        });

        return;
    }

    async getCategory(title: string): Promise<BlogCategory> {
        // get category id
        let category = await this.blogCategoryService.findOne(title);
        if (!category) {
            // create if null
            category = await this.blogCategoryService.create(title);
        }

        return category;
    }
}
