import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать! Нажмите кнопку ниже, чтобы открыть mini-app.', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Открыть mini-app', web_app: { url: process.env.WEBAPP_URL } }]]
    }
  });
});

export default async function handler(req, res) {
  try {
    await bot.handleUpdate(req.body);
  } catch (error) {
    console.error('Error in Telegram bot:', error);
  }
  res.status(200).json({ ok: true });
}