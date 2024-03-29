import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { AsaatidzsService } from './asaatidzs.service';
import { CreateAsaatidzDto } from './dto/create-asaatidz.dto';
import { UpdateAsaatidzDto } from './dto/update-asaatidz.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import path from 'path';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/auth.metadata';
import { AppService } from 'src/app.service';

@Controller('asaatidzs')
export class AsaatidzsController {
  constructor(
    private readonly asaatidzsService: AsaatidzsService,
    private readonly photoService: PhotosService,
    private readonly appService: AppService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(@Body() dataCreate: CreateAsaatidzDto, @UploadedFile() file: Express.Multer.File) {
    // for avatar
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
      const data: Prisma.AsaatidzCreateInput = { ...dataCreate };
      if (file) {
        const avatarBuffer = file.buffer;

        // resize images to 600, 900, 1200
        const sizes = [{ key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
        await Promise.all(
          sizes.map(async (s) => {
            const { key, size } = s;
            const filename = `${uniqueSuffix}_${key}.${ext}`;
            const filepath = path.join('./public/avatar/' + filename);

            await this.photoService.resize(size, avatarBuffer, filepath);
          })
        );

        data.avatar = `/avatar/${uniqueSuffix}_lg.${ext}`;
        data.avatar_md = `/avatar/${uniqueSuffix}_md.${ext}`;
      }

      return this.asaatidzsService.create(data);
    } catch (error) {
      // remove avatar
      if (file) {
        this.appService.removeFile(`/public/avatar/${uniqueSuffix}_lg.${ext}`)
        this.appService.removeFile(`/public/avatar/${uniqueSuffix}_md.${ext}`)
      }

      throw error;
    }
  }

  @Public()
  @Get()
  findAll() {
    try {
      return this.asaatidzsService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.asaatidzsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(@Param('id') id: string, @Body() updateAsaatidzDto: UpdateAsaatidzDto, @UploadedFile() file: Express.Multer.File) {
    // for avatar
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    try {

      const data: Prisma.AsaatidzUpdateInput = { ...updateAsaatidzDto };
      if (file) {
        const avatarBuffer = file.buffer;

        // resize images to 600, 900, 1200
        const sizes = [{ key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
        await Promise.all(
          sizes.map(async (s) => {
            const { key, size } = s;
            const filename = `${uniqueSuffix}_${key}.${ext}`;
            const filepath = path.join('./public/avatar/' + filename);

            await this.photoService.resize(size, avatarBuffer, filepath);
          })
        );

        data.avatar = `/avatar/${uniqueSuffix}_lg.${ext}`;
        data.avatar_md = `/avatar/${uniqueSuffix}_md.${ext}`;
      }

      return this.asaatidzsService.update(id, data);
    } catch (error) {
      // remove avatar
      if (file) {
        this.appService.removeFile(`/public/avatar/${uniqueSuffix}_lg.${ext}`)
        this.appService.removeFile(`/public/avatar/${uniqueSuffix}_md.${ext}`)
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    try {
      return this.asaatidzsService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
