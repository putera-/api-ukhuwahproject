import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, HttpCode } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/auth/auth.metadata';
import { Comment } from './comments.interface';
import { CommentReply, Prisma } from '@prisma/client';
import { CreateCommentReplyDto } from './dto/create-comment-reply.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post('article/:articleId')
  async createByArticle(@Req() req, @Param('articleId') articleId: string, @Body(new ValidationPipe) createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const userId = req.user.id;

      const data: Prisma.CommentCreateInput = {
        comment: createCommentDto.comment,
        commenter: { connect: { id: userId } },
        Article: { connect: { id: articleId } }
      };

      return this.commentsService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Post('itikaf/:itikafId')
  async createByItikaf(@Req() req, @Param('itikafId') itikafId: string, @Body(new ValidationPipe) createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const userId = req.user.id;

      const data: Prisma.CommentCreateInput = {
        comment: createCommentDto.comment,
        commenter: { connect: { id: userId } },
        Itikaf: { connect: { id: itikafId } }
      };

      return this.commentsService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Post('itikaf-schedule/:scheduleId')
  async createByItikafSchedule(@Req() req, @Param('scheduleId') scheduleId: string, @Body(new ValidationPipe) createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const userId = req.user.id;

      const data: Prisma.CommentCreateInput = {
        comment: createCommentDto.comment,
        commenter: { connect: { id: userId } },
        ItikafSchedule: { connect: { id: scheduleId } }
      };

      return this.commentsService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Post('reply/:commentId')
  async replyComment(@Req() req, @Param('commentId') commentId: string, @Body(new ValidationPipe) createCommentReplyDto: CreateCommentReplyDto): Promise<CommentReply> {
    try {
      const userId = req.user.id;

      const data: Prisma.CommentReplyCreateInput = {
        comment: createCommentReplyDto.comment,
        commenter: { connect: { id: userId } },
        Comment: { connect: { id: commentId } }
      };

      return this.commentsService.createCommentReply(data);
    } catch (error) {
      throw error;
    }
  }



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

  @Delete(':id')
  @HttpCode(204)
  removeComment(@Param('id') id: string, @Req() req) {
    try {
      if (req.user.role == 'MEMBER') {
        return this.commentsService.removeComment(id, req.user.id);
      } else {
        return this.commentsService.removeComment(id);
      }

    } catch (error) {
      throw error;
    }
  }

  @Delete('reply/:id')
  @HttpCode(204)
  removeCommentReply(@Param('id') id: string, @Req() req) {
    try {
      if (req.user.role == 'MEMBER') {
        return this.commentsService.removeCommentReply(id, req.user.id);
      } else {
        return this.commentsService.removeCommentReply(id);
      }
    } catch (error) {
      throw error;
    }
  }
}
