import { Injectable } from '@nestjs/common';
import { CreateItikafScheduleDto } from './dto/create-itikaf_schedule.dto';
import { UpdateItikafScheduleDto } from './dto/update-itikaf_schedule.dto';
import { PrismaService } from 'src/prisma.service';
import { Itikaf } from 'src/itikafs/itikafs.interface';

@Injectable()
export class ItikafSchedulesService {

  constructor(private prisma: PrismaService) { }

  create(createItikafScheduleDto: CreateItikafScheduleDto) {
    return 'This action adds a new itikafSchedule';
  }

  async findAll(): Promise<Itikaf[]> {
    return this.prisma.itikaf.findMany();
  }

  async findOne(id: string): Promise<Itikaf> {
    return this.prisma.itikaf.findUnique({ where: { id } });
  }

  update(id: number, updateItikafScheduleDto: UpdateItikafScheduleDto) {
    return `This action updates a #${id} itikafSchedule`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} itikafSchedule`;
  // }
}
