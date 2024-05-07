import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { AzureModule } from './azure/azure.module';

@Module({
  imports: [ConfigModule.forRoot(), TelegramModule, AzureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
