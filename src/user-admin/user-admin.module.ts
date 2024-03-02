import { Module } from '@nestjs/common';
import { UserAdminController } from './user-admin.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [UserAdminController],
  providers: [PrismaService],
})
export class UserAdminModule { }
