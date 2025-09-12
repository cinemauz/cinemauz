import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { config } from 'src/config/env.config';

@Injectable()
export class TelegramService {
  private bot: Telegraf;
  private chatId: number | null = null;

  constructor() {
    this.bot = new Telegraf(config.TELEGRAM.TOKEN);

    // take user id
    this.bot.on('message', (ctx) => {
      if (!this.chatId && ctx.chat?.id) {
        this.chatId = ctx.chat.id;
      }
    });

    this.bot.launch();
  }

  async sendCode(data: { email: string; otp: string }) {
    if (!this.chatId) return;
    await this.bot.telegram.sendMessage(
      this.chatId,
      `From: ${data.email}\n\nCode: ${data.otp}`,
    );
  }
}
