import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(@Body(new ValidationPipe()) createClientDto: CreateClientDto) {
    try {
      return this.clientsService.create(createClientDto);
    } catch (error) {
      throw error
    }
  }

  @Get()
  findAll() {
    try {
      return this.clientsService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.clientsService.findOne(id);
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateClientDto: UpdateClientDto) {
    try {
      return this.clientsService.update(id, updateClientDto);
    } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.clientsService.remove(id);
    } catch (error) {
      throw error
    }
  }
}
