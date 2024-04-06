import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { ItikafParticipantsService } from './itikaf_participants.service';
import { CreateItikafParticipantDto } from './dto/create-itikaf_participant.dto';
import { UpdateItikafParticipantDto } from './dto/update-itikaf_participant.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Public } from 'src/auth/auth.metadata';

@Controller('itikaf-participants')
export class ItikafParticipantsController {
  constructor(private readonly itikafParticipantsService: ItikafParticipantsService) { }

  // @Roles(Role.Member)
  // @Post()
  // create(@Req() req, @Body() createItikafParticipantDto: CreateItikafParticipantDto) {
  //   const user = req.user;
  //   console.log(user);

  //   // return this.itikafParticipantsService.create(createItikafParticipantDto);
  // }

  // dapatkan anggota itikaf berdasarkan jadwal, malam ke sekian

  @Public()
  @Get(':scheduleId')
  findAll(@Param('scheduleId') scheduleId: string) {
    try {
      return this.itikafParticipantsService.findAll(scheduleId);
    } catch (error) {
      throw error;
    }
  }

  // TODO REMOVE THIS
  @Get('me/:id')
  findMySchedule(@Req() req, @Param('id') scheduleId: string) {
    try {
      const user = req.user;
      return this.itikafParticipantsService.findMySchedule(user.id, scheduleId);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin, Role.Staff)
  @HttpCode(204)
  @Patch('coupon_taken/:id')
  setCouponTaken(@Req() req, @Param('id') id: string) {
    try {
      return this.itikafParticipantsService.setCouponTaken(id);
    } catch (error) {
      throw error;
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.itikafParticipantsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItikafParticipantDto: UpdateItikafParticipantDto) {
  //   return this.itikafParticipantsService.update(+id, updateItikafParticipantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itikafParticipantsService.remove(+id);
  // }
}
