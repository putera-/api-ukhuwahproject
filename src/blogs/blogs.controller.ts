import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from 'src/blogs/blogs.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Public } from 'src/auth/auth.metadata';

@Controller('blogs')
export class BlogsController {
    constructor(private blogService: BlogsService) { }

    @Public()
    @Get()
    async findAll(): Promise<Blog[]> {
        try {
            return this.blogService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Post()
    async create(@Req() req, @Body(new ValidationPipe()) createBlogDto: CreateBlogDto): Promise<Blog> {
        try {
            // get category
            const category = await this.blogService.getCategory(createBlogDto.category);

            const data: Record<string, any> | Prisma.BlogCreateInput = { ...createBlogDto };

            // set author
            data.author = {
                connect: { id: req.user.id }
            }
            // set category
            data.category = {
                connect: { id: category.id }
            }

            return this.blogService.create(data as Prisma.BlogCreateInput);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.blogService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto): Promise<Blog> {
        try {
            // get category
            const category = await this.blogService.getCategory(updateBlogDto.category);

            const data: Record<string, any> | Prisma.BlogCreateInput = { ...updateBlogDto };

            // set category
            data.category = {
                connect: { id: category.id }
            }

            return this.blogService.update(id, data as Prisma.BlogUpdateInput);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
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
