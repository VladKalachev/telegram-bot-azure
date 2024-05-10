import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AzureController],
})
export class AzureModule {}
