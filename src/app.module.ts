import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UserSuperadminModule } from './user-superadmin/user-superadmin.module';
import { UserAdminModule } from './user-admin/user-admin.module';
import { UserStaffModule } from './user-staff/user-staff.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { ItikafsModule } from './itikafs/itikafs.module';
import { ItikafSchedulesModule } from './itikaf_schedules/itikaf_schedules.module';
import { ItikafParticipantsModule } from './itikaf_participants/itikaf_participants.module';
import { AsaatidzsModule } from './asaatidzs/asaatidzs.module';
import { SlidesModule } from './slides/slides.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientModule,
    UserSuperadminModule,
    UserAdminModule,
    UserStaffModule,
    UsersModule,
    AuthModule,
    ArticlesModule,
    ItikafsModule,
    ItikafSchedulesModule,
    ItikafParticipantsModule,
    AsaatidzsModule,
    SlidesModule,
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
