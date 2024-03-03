import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createPath(path) {
    try {
      await fs.access(path);
    } catch (error) {
      await fs.mkdir(path);
    }
  }
}
