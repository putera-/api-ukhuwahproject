import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogCategoriesService } from './blog_categories.service';
import { CreateBlogCategoryDto } from './dto/create-blog_category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog_category.dto';
import { Public } from 'src/auth/auth.metadata';

@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(private readonly blogCategoriesService: BlogCategoriesService) { }

  // @Post()
  // create(@Body() createBlogCategoryDto: CreateBlogCategoryDto) {
  //   return this.blogCategoriesService.create(createBlogCategoryDto);
  // }

  @Public()
  @Get()
  findAll() {
    try {
      return this.blogCategoriesService.findAll();
    } catch (error) {
      throw error;
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.blogCategoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBlogCategoryDto: UpdateBlogCategoryDto) {
  //   return this.blogCategoriesService.update(+id, updateBlogCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.blogCategoriesService.remove(+id);
  // }
}
