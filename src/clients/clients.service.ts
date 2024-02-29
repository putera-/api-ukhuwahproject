import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Client } from 'interfaces/client.interface';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({ data })
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) throw new NotFoundException();

    return client;
  }

  async update(id: string, data: Prisma.ClientUpdateInput): Promise<Client> {
    await this.findOne(id);

    return this.prisma.client.update({
      where: { id },
      data
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.client.delete({
      where: { id }
    });

    return
  }
}
