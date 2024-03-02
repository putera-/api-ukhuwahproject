import { Module } from '@nestjs/common';
import { UserStaffController } from './user-staff.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [UserStaffController],
  providers: [],
})
export class UserStaffModule { }
