import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from 'interfaces/blog.interface';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
    constructor(private blogService: BlogsService) { }

    @Post()
    async create(@Body(new ValidationPipe()) createBlogDto: CreateBlogDto): Promise<Blog> {
        return this.blogService.create(createBlogDto)
    }

    @Get()
    async findAll(): Promise<Blog[]> {
        return this.blogService.findAll();
    }

}
