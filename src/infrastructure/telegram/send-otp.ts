import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { config } from 'src/config/env.config';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(config.TELEGRAM.TOKEN, { polling: false });
  }

  async sendCode(code: string) {
    try {

      // waiting sms
      const updates = await this.bot.getUpdates();
      const last = updates.pop();
            
      // send sms
      if (last?.message?.chat?.id) {

        await this.bot.sendMessage(last.message.chat.id, `Tasdiqlash kodi: ${code}`);
      }
    } catch (error) {
      console.error('Telegramga kod yuborishda xatolik', error);
    }
  }
}
