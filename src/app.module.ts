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
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './roles/roles.guard';
// import { BlogCategoriesModule } from './blog_categories/blog_categories.module';
import { BlogCategoriesModule } from './blog_categories/blog_categories.module';

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
    BlogCategoriesModule,
    // BlogCategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    AppService,
  ],
})
export class AppModule { }
