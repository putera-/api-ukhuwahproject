import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsService } from './blogs/blogs.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, BlogsController],
  providers: [AppService, BlogsService],
})
export class AppModule {}
