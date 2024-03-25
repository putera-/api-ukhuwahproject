import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req } from '@nestjs/common';
import { ItikafsService } from './itikafs.service';
import { CreateItikafDto } from './dto/create-itikaf.dto';
import { UpdateItikafDto } from './dto/update-itikaf.dto';
import { Public } from 'src/auth/auth.metadata';
import { Prisma } from '@prisma/client';

@Controller('itikafs')
export class ItikafsController {
  constructor(private readonly itikafsService: ItikafsService) { }

  @Post()
  create(@Req() req, @Body(new ValidationPipe) createItikafDto: CreateItikafDto) {
    const data: Record<string, any> | Prisma.ItikafCreateInput = { ...createItikafDto };
    data.createdBy = {
      connect: { id: req.user.id }
    }

    return this.itikafsService.create(data as Prisma.ItikafCreateInput);
  }

  @Public()
  @Get()
  findAll() {
    try {
      return this.itikafsService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.itikafsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItikafDto: UpdateItikafDto) {
    return this.itikafsService.update(id, updateItikafDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itikafsService.remove(id);
  }
}
