import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Res, ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from 'src/blogs/blog.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';

@Controller('blogs')
export class BlogsController {
    constructor(private blogService: BlogsService) { }

    @Get()
    async findAll(): Promise<Blog[]> {
        try {
            return this.blogService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async create(@Body(new ValidationPipe()) createBlogDto: CreateBlogDto): Promise<Blog> {
        try {
            const data: Record<string, any> = { ...createBlogDto };

            // TODO REMOVE, for testing
            data.clientId = 'dbffc57a-8018-4d70-a04e-cdb5ada5809d';
            data.authorId = '0081bb74-9279-4a8d-9744-109957c4b396';

            return this.blogService.create(data as Prisma.BlogCreateInput);
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.blogService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        try {
            return this.blogService.update(id, updateBlogDto);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.blogService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
