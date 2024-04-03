import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from 'src/articles/articles.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Public } from 'src/auth/auth.metadata';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import { Pagination } from 'src/app.interface';

@Controller('articles')
export class ArticlesController {
    constructor(
        private articleService: ArticlesService,
        private photoService: PhotosService,
    ) { }

    @Roles(Role.Admin, Role.Staff)
    @Get()
    async findAll(@Query('search') search: string, @Query('page') page: string, @Query('limit') limit: string): Promise<Pagination<Article[]>> {
        try {
            return this.articleService.findAll(search, page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get('published')
    async findAllPublish(@Query('search') search: string, @Query('page') page: string, @Query('limit') limit: string): Promise<Pagination<Article[]>> {
        try {
            return this.articleService.findAllPublished(search, page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Get('draft')
    async findAllDraft(): Promise<Article[]> {
        try {
            return this.articleService.findAllDraft();
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Post()
    @UseInterceptors(FilesInterceptor('photos', 10)) // key=photo. max = 10
    async create(@Req() req, @Body(new ValidationPipe()) createArticleDto: CreateArticleDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Article> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        try {
            // save photos
            let photos = [];
            if (files) photos = await this.photoService.createMany(files, uniqueSuffix);

            const data: Record<string, any> | Prisma.ArticleCreateInput = { ...createArticleDto };

            // set author
            data.author = {
                connect: { id: req.user.id }
            }

            return this.articleService.create(data as Prisma.ArticleCreateInput, photos);
        } catch (error) {
            // remove photo
            if (files) this.photoService.removeMany(files, uniqueSuffix);

            throw error;
        }
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.articleService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Get('draft/:id')
    findOneDraft(@Param('id') id: string) {
        try {
            return this.articleService.findOneDraft(id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Patch(':id')
    @UseInterceptors(FilesInterceptor('new_photos', 10)) // key=new_photos. max = 10
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateArticleDto: UpdateArticleDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Article> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        try {
            // save photos
            let new_photos = [];
            if (files) new_photos = await this.photoService.createMany(files, uniqueSuffix);

            const data: Record<string, any> | Prisma.ArticleUpdateInput = { ...updateArticleDto };

            return this.articleService.update(id, data as Prisma.ArticleUpdateInput, new_photos);
        } catch (error) {
            // remove photo
            if (files) this.photoService.removeMany(files, uniqueSuffix);

            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.articleService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
