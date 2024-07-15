import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
@Update()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
  ) {
    this.bot.telegram.setMyCommands([
      {
        command: 'start',
        description: 'Start Telegram',
      },
      {
        command: 'chatId',
        description: 'Получить chatId',
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
    // await ctx.reply(`Get chat id ${ctx.chat.id}`);
    await ctx.reply(`Привет, ${ctx.message.from.first_name}!`);
  }

  @Command(['task', 'text'])
  async getTaskCommand(@Ctx() ctx: Context) {
    // console.log(ctx);
    await ctx.reply(`Вы хотите получить данные по задаче? Введи его id`);
    const msg = ctx.message ?? ctx.editedMessage;
    console.log(msg);
    // const task = await this.azureService.getTask(1099);
    // await ctx.reply(`${JSON.stringify(task)}`);
  }

  @Command(['st', 'update'])
  async messageCommand(@Ctx() ctx: Context) {
    await ctx.reply(`Надо подумать`);
  }

  @Command('help')
  async helpCommand(@Ctx() ctx: Context) {
    await ctx.reply('Help command.');
  }

  @Command('chatId')
  async chatIdCommand(@Ctx() ctx: Context) {
    await ctx.reply(`Get chat id ${ctx.chat.id}`);
  }

  async sendMessage(chatId: string, text: any) {
    const info = text.eventType;
    const messageText = text.message.text;
    try {
      await this.bot.telegram.sendMessage(chatId, `${info} \n ${messageText}`);
    } catch (error) {
      console.error('Error sending Telegram message', error);
    }
  }
}
