import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PhotosService {
  async createMany(files: Array<Express.Multer.File>, uniqueSuffix: string) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const photos = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.originalname.split('.').pop();
      const buffer = file.buffer;

      // resize images to 600, 900, 1200
      const sizes = [{ key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
      await Promise.all(
        sizes.map(async (s) => {
          const { key, size } = s;
          const filename = `${uniqueSuffix}${i}_${key}.${ext}`;
          const filepath = path.join('./uploads/photos/' + filename);

          await this.resize(size, buffer, filepath);
        })
      );

      photos.push({
        index: i,
        path: `/uploads/photos/${uniqueSuffix}${i}_lg.${ext}`,
        path_md: `/uploads/photos/${uniqueSuffix}${i}_md.${ext}`,
      });
    }

    return photos;
  }

  async resize(size, buffer, filepath) {
    const resizedBuffer = await sharp(buffer, { animated: true })
      .resize(size)
      .toBuffer();

    // Save the resized image to disk
    fs.writeFile(filepath, resizedBuffer);
  }

  // create(createPhotoDto: CreatePhotoDto) {
  //   return 'This action adds a new photo';
  // }

  // findAll() {
  //   return `This action returns all photos`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} photo`;
  // }

  // update(id: number, updatePhotoDto: UpdatePhotoDto) {
  //   return `This action updates a #${id} photo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} photo`;
  // }

  removeMany(files, uniqueSuffix) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.originalname.split('.').pop();

      this.removeFile(`/uploads/photos/${uniqueSuffix}${i}_lg.${ext}`);
      this.removeFile(`/uploads/photos/${uniqueSuffix}${i}_md.${ext}`);
    }
  }

  async removeFile(file) {
    try {
      await fs.rm('.' + file);
    } catch (error) {
      throw (error);
    }
  };
}
