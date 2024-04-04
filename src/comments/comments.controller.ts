import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/auth/auth.metadata';
import { Comment } from './comments.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  // @Post()
  // create(@Body() createCommentDto: CreateCommentDto) {
  //   return this.commentsService.create(createCommentDto);
  // }



  // @Get()
  // findAll() {
  //   return this.commentsService.findAll();
  // }

  @Public()
  @Get('/:articleId/:page')
  find(@Param('articleId') articleId: string, @Param('page') page: string = '1'): Promise<Comment[]> {
    try {
      return this.commentsService.find(articleId, page);
    } catch (error) {
      throw error;
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentsService.remove(+id);
  // }
}
