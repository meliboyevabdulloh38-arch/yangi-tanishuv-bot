const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Public papkasini statik ulash
app.use(express.static(path.join(__dirname, 'public')));

// Environment Variables
const TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

if (TOKEN) {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Assalomu alaykum! Nikoh ilovasiga xush kelibsiz.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "💜 Ilovani ochish", web_app: { url: WEB_APP_URL } }]
        ]
      }
    });
  });
}

// Nomzodlar uchun API (Katalog)
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: "Nigina", age: 29, city: "Toshkent shahri", match: 75, isVip: true, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Guli", age: 29, city: "Toshkent shahri", match: 57, isVip: true, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Bibi", age: 28, city: "Farg'ona viloyati", match: 100, isPremium: true, status: "При разговоре скажу" },
    { id: 4, name: "Mohim", age: 27, city: "Farg'ona viloyati", match: 100, isPremium: true, status: "Hunarmand" },
    { id: 5, name: "Maftuna", age: 26, city: "Farg'ona viloyati", match: 100, isPremium: true, status: "Tadbirkor" },
    { id: 6, name: "Samiya", age: 20, city: "Farg'ona viloyati", match: 100, status: "O'qiyman" },
    { id: 7, name: "Nigora", age: 29, city: "Farg'ona viloyati", match: 100, status: "Hamshira" }
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda`);
});
