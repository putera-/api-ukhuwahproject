import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogCategoryDto } from './create-blog_category.dto';

export class UpdateBlogCategoryDto extends PartialType(CreateBlogCategoryDto) {}
