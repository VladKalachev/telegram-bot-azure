import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AzureService } from './azure.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AzureController],
  providers: [AzureService],
  exports: [AzureService],
})
export class AzureModule {}
