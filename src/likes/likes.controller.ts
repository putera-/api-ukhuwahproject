import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

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
  @HttpCode(204)
  async likeItikaf(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.likeItikaf(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/itikaf-schedule/:id')
  @HttpCode(204)
  async likeItikafSchedule(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.likeItikafSchedule(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/article/:id')
  @HttpCode(204)
  async likeArticle(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.likeArticle(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/comment/:id')
  @HttpCode(204)
  async likeComment(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.likeComment(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/comment-reply/:id')
  @HttpCode(204)
  async likeCommentReply(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.likeCommentReply(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  // UNLIKE

  @Delete('/itikaf/:id')
  @HttpCode(204)
  async unLikeItikaf(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.unLikeItikaf(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/itikaf-schedule/:id')
  @HttpCode(204)
  async unLikeItikafSchedule(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.unLikeItikafSchedule(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/article/:id')
  @HttpCode(204)
  async unLikeArticle(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.unLikeArticle(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/comment/:id')
  @HttpCode(204)
  async unLikeComment(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.unLikeComment(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/comment-reply/:id')
  @HttpCode(204)
  async unLikeCommentReply(@Req() req, @Param('id') id: string): Promise<void> {
    try {
      return this.likesService.unLikeCommentReply(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }

}
