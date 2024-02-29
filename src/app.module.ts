import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [ConfigModule.forRoot(), ClientsModule, UsersModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
