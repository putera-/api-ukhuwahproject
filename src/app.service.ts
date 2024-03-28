import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';

@Injectable()
export class AppService {

  async createPath(path) {
    try {
      await fs.access(path);
    } catch (error) {
      await fs.mkdir(path);
    }
  }

  async removeFile(file) {
    try {
      await fs.rm('.' + file);
    } catch (error) {
    }
  };
}
