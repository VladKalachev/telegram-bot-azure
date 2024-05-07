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

@Controller('azure')
export class AzureController {
  config: string;
  constructor(private readonly configService: ConfigService) {
    this.config = configService.get('TELEGRAM_TOKEN');
  }

  @Get()
  getAll() {
    return 'azure:' + this.config;
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
