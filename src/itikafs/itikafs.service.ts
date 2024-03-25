import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItikafDto } from './dto/create-itikaf.dto';
import { UpdateItikafDto } from './dto/update-itikaf.dto';
import { PrismaService } from 'src/prisma.service';
import { Itikaf } from './itikafs.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItikafsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.ItikafCreateInput)
    : Promise<Itikaf> {
    return this.prisma.itikaf.create({
      data
    });
  }

  async findAll(): Promise<Itikaf[]> {
    return this.prisma.itikaf.findMany();
  }

  async findOne(id: string): Promise<Itikaf> {
    const itikaf = await this.prisma.itikaf.findUnique({ where: { id } });

    if (!itikaf) throw new NotFoundException();

    return itikaf;
  }


  update(id: string, updateItikafDto: UpdateItikafDto) {
    this.findOne(id);
    return `This action updates a #${id} itikaf`;
  }

  remove(id: string) {
    this.findOne(id);
    return `This action removes a #${id} itikaf`;
  }
}
