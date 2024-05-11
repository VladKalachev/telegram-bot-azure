import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AzureService } from './azure.service';

@Controller('azure')
export class AzureController {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly azureService: AzureService,
  ) {}

  @Get('task/:id')
  async getTask(@Param('id') id: number) {
    await this.azureService.getTask(id);
  }

  @Get()
  getAll() {
    return 'azure:';
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return `azure ${id}`;
  }

  @Post('create')
  create(@Body() dto: string) {
    return `azure ${dto}`;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: string) {
    return `azure ${id}:= ${dto}`;
  }

  @Delete(':id')
  delete(@Param() id: string) {
    return `azure ${id}`;
  }
}
