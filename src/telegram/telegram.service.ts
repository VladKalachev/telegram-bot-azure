import { ConfigService } from '@nestjs/config';
import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

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
        command: 'update',
        description: 'Start Telegram',
      },
    ]);
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.message.from.first_name}!`);
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
