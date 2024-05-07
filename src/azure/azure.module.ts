import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AzureController],
})
export class AzureModule {}
