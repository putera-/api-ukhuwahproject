import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseCategoriesService } from './course_categories.service';
import { CreateCourseCategoryDto } from './dto/create-course_category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course_category.dto';
import { Public } from 'src/auth/auth.metadata';

@Controller('course-categories')
export class CourseCategoriesController {
  constructor(private readonly courseCategoriesService: CourseCategoriesService) { }

  // @Post()
  // create(@Body() createCourseCategoryDto: CreateCourseCategoryDto) {
  //   return this.courseCategoriesService.create(createCourseCategoryDto);
  // }

  @Public()
  @Get()
  findAll() {
    try {
      return this.courseCategoriesService.findAll();
    } catch (error) {
      throw error;
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.courseCategoriesService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCourseCategoryDto: UpdateCourseCategoryDto) {
  //   return this.courseCategoriesService.update(id, updateCourseCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.courseCategoriesService.remove(id);
  // }
}
