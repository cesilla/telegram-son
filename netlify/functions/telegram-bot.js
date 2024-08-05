// netlify/functions/telegram-bot.js
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('text', (ctx) => {
  ctx.reply('Message received');
});

exports.handler = async (event, context) => {
  // Webhook URL'ini Telegram'a kaydetme (bu sadece örnek)
  bot.telegram.setWebhook('https://bosbot.netlify.app/.netlify/functions/telegram-bot');

  // Webhook isteğini işleme
  if (event.httpMethod === 'POST') {
    await bot.handleUpdate(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};
