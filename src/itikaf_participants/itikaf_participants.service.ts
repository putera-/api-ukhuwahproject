import { Injectable } from '@nestjs/common';
import { CreateItikafParticipantDto } from './dto/create-itikaf_participant.dto';
import { UpdateItikafParticipantDto } from './dto/update-itikaf_participant.dto';
import { PrismaService } from 'src/prisma.service';
import { ItikafParticipant, Vehicle } from './itikaf_participants.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItikafParticipantsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(data: Prisma.ItikafParticipantCreateInput, scheduleId: string, userId: string): Promise<ItikafParticipant> {
    console.log(data);
    const participated = await this.prisma.itikafParticipant.findFirst({
      where: { scheduleId, userId }
    });

    let dataParticipant: ItikafParticipant;

    if (participated) {
      dataParticipant = await this.prisma.itikafParticipant.update({
        where: { id: participated.id },
        data
      });
    } else {
      dataParticipant = await this.prisma.itikafParticipant.create({
        data
      });
    }

    return dataParticipant;
  }

  findAll(scheduleId: string): Promise<ItikafParticipant[]> {
    return this.prisma.itikafParticipant.findMany({
      where: { scheduleId: scheduleId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            avatar_md: true,
            role: true
          }
        }
      }
    });
  }

  // findOne(scheduleId: string, id: string) {
  //   return this.prisma.itikafParticipant.findUnique({
  //     where: { id }
  //   });
  // }

  async update(update: Prisma.ItikafParticipantUpdateInput, scheduleId: string, userId: string): Promise<ItikafParticipant> {
    const userParticipantData = await this.prisma.itikafParticipant.findFirst({
      where: { scheduleId, userId }
    })

    return this.prisma.itikafParticipant.update({
      where: { id: userParticipantData.id },
      data: update,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            avatar_md: true,
            role: true
          }
        }
      }
    });

    // return `This action updates a #${id} itikafParticipant`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} itikafParticipant`;
  // }

  // GET VEHICLE
  async getVehicle(vehicle_no: string, vehicle_type: 'Motor' | 'Mobil', userId: string): Promise<Vehicle> {
    const dataVehicle: Prisma.VehicleCreateInput = {
      vehicle_no,
      vehicle_type,
      user: { connect: { id: userId } }
    }
    let vehicle = await this.prisma.vehicle.findFirst({ where: { vehicle_no } });
    if (!vehicle) {
      vehicle = await this.prisma.vehicle.create({
        data: dataVehicle
      })
    } else {
      vehicle = await this.prisma.vehicle.update({
        where: { id: vehicle.id },
        data: dataVehicle
      })
    }
    return vehicle;
  }
}
