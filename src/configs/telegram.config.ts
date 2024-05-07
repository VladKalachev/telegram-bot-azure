import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService) => {
  const token = configService.get('TELEGRAM_TOKEN');

  if (!token) {
    throw new Error('TELEGRAM_TOKEN не задан');
  }

  return {
    token,
  };
};
