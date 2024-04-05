import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './likes.interface';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  // @Post()
  // create(@Body() createLikeDto: CreateLikeDto) {
  //   return this.likesService.create(createLikeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.likesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.likesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
  //   return this.likesService.update(+id, updateLikeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.likesService.remove(+id);
  // }

  // LIKE

  @Post('/itikaf/:id')
  async likeItikaf(@Req() req, @Param('id') id: string): Promise<Like> {
    try {
      return this.likesService.likeItikaf(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/itikaf-schedule/:id')
  async likeItikafSchedule(@Req() req, @Param('id') id: string): Promise<Like> {
    try {
      return this.likesService.likeItikafSchedule(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/article/:id')
  async likeArticle(@Req() req, @Param('id') id: string): Promise<Like> {
    try {
      return this.likesService.likeArticle(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/comment/:id')
  async likeComment(@Req() req, @Param('id') id: string): Promise<Like> {
    try {
      return this.likesService.likeComment(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/comment-reply/:id')
  async likeCommentReply(@Req() req, @Param('id') id: string): Promise<Like> {
    try {
      return this.likesService.likeCommentReply(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  // DISLIKE

  @Delete('/itikaf/:id')
  @HttpCode(204)
  async disLikeItikaf(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.disLikeItikaf(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/itikaf-schedule/:id')
  @HttpCode(204)
  async disLikeItikafSchedule(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.disLikeItikafSchedule(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/article/:id')
  @HttpCode(204)
  async disLikeArticle(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.disLikeArticle(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/comment/:id')
  @HttpCode(204)
  async disLikeComment(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.disLikeComment(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/comment-reply/:id')
  @HttpCode(204)
  async disLikeCommentReply(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.disLikeCommentReply(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

}
