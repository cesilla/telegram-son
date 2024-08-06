const { Telegraf } = require('telegraf');

const web_link = "https://bosbot.netlify.app/";
const bot = new Telegraf('7497961026:AAGvq85hScdvvKY6cmJ1rVgq9M6INhpdB9Y');

bot.start((ctx) => ctx.reply("deneme", {
  reply_markup: {
    keyboard: [[{
      text: "web app",
      web_app: { url: web_link }
    }]]
  },
}));

bot.launch();
