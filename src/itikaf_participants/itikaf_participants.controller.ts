import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
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
    return this.itikafParticipantsService.findAll(scheduleId);
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
