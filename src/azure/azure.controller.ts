import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('azure')
export class AzureController {
  @Get()
  getAll() {
    return 'azure';
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
