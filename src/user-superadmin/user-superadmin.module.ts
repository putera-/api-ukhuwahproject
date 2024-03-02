import { Module } from '@nestjs/common';
import { UserSuperadminController } from './user-superadmin.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [UserSuperadminController],
  providers: [PrismaService],
})
export class UserSuperadminModule { }
