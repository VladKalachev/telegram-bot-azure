import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { ConfigModule } from '@nestjs/config';
import { AzureService } from './azure.service';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  controllers: [AzureController],
  imports: [ConfigModule, TelegramModule],
  providers: [AzureService],
  exports: [AzureService],
})
export class AzureModule {}
