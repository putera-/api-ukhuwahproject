import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { PhotosModule } from 'src/photos/photos.module';
import { AppService } from 'src/app.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AppService],
  exports: [UsersService],
  imports: [PhotosModule]
})
export class UsersModule { }
