import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Client } from 'src/client/client.interface';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({ data })
  }

  async find(): Promise<Client> {
    const client = await this.prisma.client.findFirst();
    if (!client) {
      // data dummy
      const data: Prisma.ClientCreateInput = { name: '-' }
      return this.create(data);
    }

    return client;
  }

  async update(data: Prisma.ClientUpdateInput): Promise<Client> {
    const { id } = await this.find();

    return this.prisma.client.update({
      where: { id },
      data
    });
  }
}
