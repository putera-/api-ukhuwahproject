import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from 'src/blogs/blog.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.BlogCreateInput): Promise<Blog> {

        return await this.prisma.blog.create({ data });
    }

    async findAll(): Promise<Blog[]> {
        return this.prisma.blog.findMany({ where: { deleted: false } });
    }

    async findOne(id: string): Promise<Blog> {
        const blog = await this.prisma.blog.findUnique({
            where: { id, deleted: false }
        });
        if (!blog) throw new NotFoundException();

        return blog;
    }

    async update(id: string, data: Prisma.BlogUpdateInput): Promise<Blog> {
        await this.findOne(id);

        return this.prisma.blog.update({
            where: { id, deleted: false },
            data
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
}
