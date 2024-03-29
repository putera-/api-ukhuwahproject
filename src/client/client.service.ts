import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Client } from 'src/client/client.interface';
import { AppService } from 'src/app.service';

@Injectable()
export class ClientService {
  constructor(
    private prisma: PrismaService,
    private appService: AppService
  ) { }

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({ data })
  }

  async find(): Promise<Client> {
    const client = await this.prisma.client.findFirst();
    if (!client) {
      // data dummy
      const data: Prisma.ClientCreateInput = {
        name: '-',
        nick: '-'
      }
      return this.create(data);
    }

    return client;
  }

  async update(data: Prisma.ClientUpdateInput): Promise<Client> {
    const currentData = await this.find();

    const updatedData = await this.prisma.client.update({
      where: { id: currentData.id },
      data
    });

    if (currentData.logo != updatedData.logo) {
      // hapus photo lama
      this.appService.removeFile('/public' + currentData.logo);
      this.appService.removeFile('/public' + currentData.logo_sm);
    }

    return updatedData;
  }
}
