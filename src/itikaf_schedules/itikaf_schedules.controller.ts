import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItikafSchedulesService } from './itikaf_schedules.service';
import { CreateItikafScheduleDto } from './dto/create-itikaf_schedule.dto';
import { UpdateItikafScheduleDto } from './dto/update-itikaf_schedule.dto';
import { Public } from 'src/auth/auth.metadata';

@Controller('itikaf-schedules')
export class ItikafSchedulesController {
  constructor(private readonly itikafSchedulesService: ItikafSchedulesService) { }

  @Post()
  create(@Body() createItikafScheduleDto: CreateItikafScheduleDto) {
    return this.itikafSchedulesService.create(createItikafScheduleDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.itikafSchedulesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itikafSchedulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItikafScheduleDto: UpdateItikafScheduleDto) {
    return this.itikafSchedulesService.update(+id, updateItikafScheduleDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itikafSchedulesService.remove(+id);
  // }
}
