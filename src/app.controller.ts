import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.metadata';
import fs from 'fs/promises';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get('avatar/:file')
  async getAvatar(@Param('file') file: string, @Res() res) {
    console.log('masuk ambil avatar')
    try {
      await fs.access(`./public/avatar/${file}`);
      res.sendFile(file, { root: './public/avatar' })
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
