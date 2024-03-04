import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from 'src/blogs/blogs.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Public } from 'src/auth/auth.metadata';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';

@Controller('blogs')
export class BlogsController {
    constructor(
        private blogService: BlogsService,
        private photoService: PhotosService,
    ) { }

    @Roles(Role.Admin, Role.Staff)
    @Get()
    async findAll(): Promise<Blog[]> {
        try {
            return this.blogService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get('publish')
    async findAllPublish(): Promise<Blog[]> {
        try {
            return this.blogService.findAllPublish();
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Get('draft')
    async findAllDraft(): Promise<Blog[]> {
        try {
            return this.blogService.findAllDraft();
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Post()
    @UseInterceptors(FilesInterceptor('photos', 10)) // key=photo. max = 10
    async create(@Req() req, @Body(new ValidationPipe()) createBlogDto: CreateBlogDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Blog> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        try {
            // save photos
            const photos = await this.photoService.createMany(files, uniqueSuffix);

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

            return this.blogService.create(data as Prisma.BlogCreateInput, photos);
        } catch (error) {
            // remove photo
            this.photoService.removeMany(files, uniqueSuffix);

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
    @Get('draft/:id')
    findOneDraft(@Param('id') id: string) {
        try {
            return this.blogService.findOneDraft(id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Patch(':id')
    @UseInterceptors(FilesInterceptor('new_photos', 10)) // key=new_photos. max = 10
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateBlogDto: UpdateBlogDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Blog> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        try {
            // save photos
            const new_photos = await this.photoService.createMany(files, uniqueSuffix);

            // get category
            const category = await this.blogService.getCategory(updateBlogDto.category);

            const data: Record<string, any> | Prisma.BlogCreateInput = { ...updateBlogDto };

            // set category
            data.category = {
                connect: { id: category.id }
            }

            return this.blogService.update(id, data as Prisma.BlogUpdateInput, new_photos);
        } catch (error) {
            // remove photo
            this.photoService.removeMany(files, uniqueSuffix);

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
