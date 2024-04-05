import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
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
  @Get('article/:articleId/:page')
  loadByArticle(@Param('articleId') articleId: string, @Param('page') page: string = '1', @Req() req): Promise<Comment[]> {
    try {
      const userId: string | undefined = req.user ? req.user.id : undefined;
      return this.commentsService.loadByArticle(articleId, page, userId);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get('itikaf/:itikafId/:page')
  loadByItikaf(@Param('itikafId') itikafId: string, @Param('page') page: string = '1', @Req() req): Promise<Comment[]> {
    try {
      const userId: string | undefined = req.user ? req.user.id : undefined;
      return this.commentsService.loadByItikaf(itikafId, page, userId);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get('itikaf-schedule/:scheduleId/:page')
  loadByItikafSchedule(@Param('scheduleId') scheduleId: string, @Param('page') page: string = '1', @Req() req): Promise<Comment[]> {
    try {
      const userId: string | undefined = req.user ? req.user.id : undefined;
      return this.commentsService.loadByItikafSchedule(scheduleId, page, userId);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get('reply/:commentId/:page')
  loadReply(@Param('commentId') commentId: string, @Param('page') page: string = '1', @Req() req): Promise<Comment[]> {
    try {
      const userId: string | undefined = req.user ? req.user.id : undefined;
      return this.commentsService.loadReply(commentId, page, userId);
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
