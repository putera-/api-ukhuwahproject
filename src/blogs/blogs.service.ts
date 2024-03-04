import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from 'src/blogs/blogs.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { BlogCategory, Prisma } from '@prisma/client';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogCategoriesService } from 'src/blog_categories/blog_categories.service';
import { AppService } from 'src/app.service';

@Injectable()
export class BlogsService {
    constructor(
        private prisma: PrismaService,
        private blogCategoryService: BlogCategoriesService,
        private appService: AppService
    ) { }

    async create(data: Prisma.BlogCreateInput, photos: Prisma.PhotoCreateInput[]): Promise<Blog> {
        return await this.prisma.blog.create({
            data: {
                ...data,
                photos: { create: photos }
            },
            include: {
                author: true,
                category: true,
                photos: true
            }
        });
    }

    async findAll(): Promise<Blog[]> {
        return this.prisma.blog.findMany({
            where: { deleted: false },
            include: {
                author: true,
                category: true,
                photos: true
            }
        });
    }

    async findOne(id: string): Promise<Blog> {
        const blog = await this.prisma.blog.findUnique({
            where: { id, deleted: false },
            include: {
                author: true,
                category: true,
                photos: true
            }
        });
        if (!blog) throw new NotFoundException();

        return blog;
    }

    async update(id: string, data: any, new_photos: Prisma.PhotoCreateInput[]): Promise<Blog> {
        const current_blog = await this.findOne(id);

        // if no photo from req data
        const keptPhotos: Record<string, any> = data.photos ? data.photos : [];
        // collect data photos to update
        const photosUpdate = keptPhotos.map(p => ({
            where: { id: p.id },
            data: { index: parseInt(p.index) }
        }));

        const keepedIds = keptPhotos.map(p => p.id);
        const keepedIndexes = keptPhotos.map(p => p.index);

        // get taken index
        const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        // get available index
        const availableIndexes = indexes.filter(i => !keepedIndexes.includes(i));

        // update new photo indexes
        new_photos = new_photos.map(p => {
            p.index = availableIndexes[0];
            availableIndexes.shift();
            return p;
        });

        // remove photos from req.data
        if (data.photos) delete data.photos;

        const updatedBlog = await this.prisma.blog.update({
            where: { id, deleted: false },
            data: {
                ...data,
                photos: {
                    update: photosUpdate,
                    deleteMany: {
                        id: {
                            notIn: keepedIds
                        }
                    },
                    create: new_photos
                }
            },
            include: {
                author: true,
                category: true,
                photos: true
            }
        });

        // collect unused photo
        const photo_to_delete = current_blog.photos.filter(p => !keepedIds.includes(p.id));
        // deleted unused photo files
        this.removePhotos(photo_to_delete);

        return updatedBlog;
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

    removePhotos(photos) {
        for (const photo of photos) {
            this.appService.removeFile(photo.path);
            this.appService.removeFile(photo.path_md);
        }
    };
}
