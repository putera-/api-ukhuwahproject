import { Injectable } from '@nestjs/common';
import { Blog } from 'interfaces/blog.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

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
}
