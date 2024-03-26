import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ValidationPipe, UploadedFiles, HttpCode, Req } from '@nestjs/common';
import { ItikafSchedulesService } from './itikaf_schedules.service';
import { CreateItikafScheduleDto } from './dto/create-itikaf_schedule.dto';
import { UpdateItikafScheduleDto } from './dto/update-itikaf_schedule.dto';
import { Public } from 'src/auth/auth.metadata';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ItikafSchedule } from './itikaf_schedules.interface';
import { PhotosService } from 'src/photos/photos.service';
import { Prisma } from '@prisma/client';
import { CreateItikafParticipantDto } from 'src/itikaf_participants/dto/create-itikaf_participant.dto';
import { ItikafParticipantsService } from 'src/itikaf_participants/itikaf_participants.service';
import { Vehicle } from 'src/itikaf_participants/itikaf_participants.interface';
import { UpdateItikafParticipantDto } from 'src/itikaf_participants/dto/update-itikaf_participant.dto';

@Controller('itikaf-schedules')
export class ItikafSchedulesController {
  constructor(
    private readonly itikafSchedulesService: ItikafSchedulesService,
    private readonly itikafParticipantsService: ItikafParticipantsService,
    private photoService: PhotosService
  ) { }

  @Roles(Role.Admin, Role.Staff)
  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10)) // key=photo. max = 10
  async create(@Body(new ValidationPipe) createItikafScheduleDto: CreateItikafScheduleDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<ItikafSchedule> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
      // save photos
      let photos = [];
      if (files) photos = await this.photoService.createMany(files, uniqueSuffix);

      const data: Record<string, any> | Prisma.ItikafScheduleCreateInput = { ...createItikafScheduleDto };

      // connect itikaf id
      data.itikaf = {
        connect: { id: data.itikafId }
      }

      // remove itikaf id
      delete data.itikafId;

      return this.itikafSchedulesService.create(data as Prisma.ItikafScheduleCreateInput, photos);
    } catch (error) {
      // remove photo
      if (files) this.photoService.removeMany(files, uniqueSuffix);

      throw error;
    }
  }

  @Public()
  @Get()
  findAll() {
    try {
      return this.itikafSchedulesService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.itikafSchedulesService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('new_photos', 10)) // key=new_photos. max = 10
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateItikafScheduleDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<ItikafSchedule> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    try {
      // save photos
      let new_photos = [];
      if (files) new_photos = await this.photoService.createMany(files, uniqueSuffix);

      return this.itikafSchedulesService.update(id, data as Prisma.ItikafScheduleUpdateInput, new_photos);
    } catch (error) {
      // remove photo
      if (files) this.photoService.removeMany(files, uniqueSuffix);

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    try {
      return this.itikafSchedulesService.remove(id);
    } catch (error) {
      throw error;
    }
  }

  // USER PARTICIPATE
  // All Roles
  @Post('participate/:scheduleId')
  async participate(@Req() req, @Param('scheduleId') scheduleId: string, @Body() dataParticipant: CreateItikafParticipantDto) {
    try {
      const user = req.user;
      const schedule = await this.itikafSchedulesService.findOne(scheduleId);

      const data: Prisma.ItikafParticipantCreateInput = {
        total_member: dataParticipant.man + dataParticipant.woman,
        man: dataParticipant.man,
        woman: dataParticipant.woman,
        user: { connect: { id: user.id } },
        schedule: { connect: { id: schedule.id } }
      }

      if (dataParticipant.vehicle_no) {
        const vehicle: Vehicle = await this.itikafParticipantsService.getVehicle(dataParticipant.vehicle_no, dataParticipant.vehicle_type, user.id);

        data.vehicle = { connect: { id: vehicle.id } };
      }

      return this.itikafParticipantsService.create(data, scheduleId, user.id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('unparticipate/:scheduleId')
  async unparticipate(@Req() req, @Param('scheduleId') scheduleId: string, @Body() dataUpdate: UpdateItikafParticipantDto) {
    try {
      const user = req.user;

      const data: Prisma.ItikafParticipantUpdateInput = {
        unparticipate_reason: dataUpdate.unparticipate_reason,
        participate: false
      }

      return this.itikafParticipantsService.update(data, scheduleId, user.id);
    } catch (error) {
      throw error;
    }
  }
}
