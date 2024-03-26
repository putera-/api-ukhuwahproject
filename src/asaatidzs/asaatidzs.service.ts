import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsaatidzDto } from './dto/create-asaatidz.dto';
import { UpdateAsaatidzDto } from './dto/update-asaatidz.dto';
import { PrismaService } from 'src/prisma.service';
import { Asaatidz } from './asaatidzs.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class AsaatidzsService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(data: Prisma.AsaatidzCreateInput): Promise<Asaatidz> {
    return this.prisma.asaatidz.create({ data });
  }

  async findAll(): Promise<Asaatidz[]> {
    return this.prisma.asaatidz.findMany();
  }

  async findOne(id: string): Promise<Asaatidz> {
    const asaatidz: Asaatidz = await this.prisma.asaatidz.findUnique({ where: { id, deleted: false } });
    if (!asaatidz) throw new NotFoundException();

    return asaatidz;
  }

  async update(id: string, data: Prisma.AsaatidzUpdateInput): Promise<Asaatidz> {
    await this.findOne(id);

    return this.prisma.asaatidz.update({
      where: { id },
      data
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.asaatidz.update({
      where: { id },
      data: { deleted: true }
    });
    return;
  }
}
