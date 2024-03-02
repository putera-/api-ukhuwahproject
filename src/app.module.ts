import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { UserSuperadminModule } from './user-superadmin/user-superadmin.module';
import { UserAdminModule } from './user-admin/user-admin.module';
import { UserStaffModule } from './user-staff/user-staff.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule,
    UserSuperadminModule,
    UserAdminModule,
    UserStaffModule,
    UsersModule,
    AuthModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
