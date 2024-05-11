import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { AzureService } from 'src/azure/azure.service';
import { Context, Telegraf } from 'telegraf';

@Injectable()
@Update()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
    private readonly azureService: AzureService,
  ) {
    this.bot.telegram.setMyCommands([
      {
        command: 'start',
        description: 'Start Telegram',
      },
      {
        command: 'update',
        description: 'Start Telegram',
      },
      {
        command: 'task',
        description: 'Получить данные по задаче',
      },
    ]);
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.message.from.first_name}!`);
  }

  @Command(['task'])
  async getTaskCommand(ctx: Context) {
    console.log(ctx);
    await ctx.reply(`Вы хотите получить данные по задаче? Введи его id`);
    const task = await this.azureService.getTask(1100);
    await ctx.reply(`${JSON.stringify(task)}`);
  }

  @Command(['st', 'update'])
  async messageCommand(ctx: Context) {
    await ctx.reply(`Надо подумать`);
  }

  @Command('help')
  async helpCommand(@Ctx() ctx: Context) {
    await ctx.reply('Help command.');
  }
}
