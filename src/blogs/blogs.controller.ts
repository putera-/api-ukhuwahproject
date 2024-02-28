import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Res, ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from 'interfaces/blog.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
    constructor(private blogService: BlogsService) { }

    @Get()
    async findAll(): Promise<Blog[]> {
        return this.blogService.findAll();
    }

    @Post()
    async create(@Body(new ValidationPipe()) createBlogDto: CreateBlogDto): Promise<Blog> {
        return this.blogService.create(createBlogDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogService.update(id, updateBlogDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        try {
            return this.blogService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
