import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode } from '@nestjs/common';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Public } from 'src/auth/auth.metadata';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Public()
  @Get()
  find() {
    try {
      return this.clientService.find();
    } catch (error) {
      throw error
    }
  }

  @Roles(Role.Superuser, Role.Admin)
  @Patch()
  update(@Body(new ValidationPipe()) updateClientDto: UpdateClientDto) {
    try {
      return this.clientService.update(updateClientDto);
    } catch (error) {
      throw error
    }
  }
}
