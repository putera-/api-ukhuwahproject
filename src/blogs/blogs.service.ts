import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from 'interfaces/blog.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.BlogCreateInput): Promise<Blog> {
        return await this.prisma.blog.create({
            data
        });
    }

    async findAll(): Promise<Blog[]> {
        return this.prisma.blog.findMany();
    }

    async findOne(id: string): Promise<Blog> {
        return this.prisma.blog.findFirstOrThrow({
            where: { id }
        });
    }

    async update(id: string, data: Prisma.BlogUpdateInput): Promise<Blog> {
        return this.prisma.blog.update({
            where: { id },
            data
        });
    }

    async remove(id: string): Promise<void> {

        const blog = await this.prisma.blog.findUnique({
            where: { id }
        });

        // TODO handle exception
        // if (!blog) throw new Error("Blog not found nyooo");
        if (!blog) throw new NotFoundException();

        await this.prisma.blog.delete({
            where: { id }
        });
    }
}
