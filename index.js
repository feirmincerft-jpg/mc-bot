const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// إعداد خادم ويب لمنع إغلاق Replit
app.get('/', (req, res) => res.send('البوت يعمل بنجاح!'));
app.listen(3000, () => console.log('خادم الويب يعمل على المنفذ 3000'));

const botConfig = {
  host: '65.108.0.184', // IP الرقمي المباشر
  port: 27906,                // بورت سيرفرك
  username: 'AFK_Bot_24',     // اسم البوت
  auth: 'offline',            // هذا السطر يحل المشكلة ويخبر البوت أن السيرفر مكرك
  version: '1.21'
};

function createBot() {
  console.log('جاري الاتصال بالسيرفر...');
  const bot = mineflayer.createBot(botConfig);

  bot.on('spawn', () => {
    console.log('دخل البوت السيرفر بنجاح!');
    
    // البوت سيقوم بالتسجيل والدخول تلقائياً عبر الشات
    setTimeout(() => {
      bot.chat('/register BotPass123! BotPass123!');
      console.log('تم كتابة أمر التسجيل (Register)');
    }, 2000);

    setTimeout(() => {
      bot.chat('/login BotPass123!');
      console.log('تم كتابة أمر تسجيل الدخول (Login)');
    }, 4000);
  });

  // هذه الإضافة لقراءة ما يكتبه السيرفر للبوت في الشات
  bot.on('message', (message) => {
    console.log('السيرفر يقول: ', message.toAnsi());
  });

  // إذا ظهرت للبوت نافذة تسجيل داخل اللعبة سيقوم بإغلاقها لتخطيها
  bot.on('windowOpen', (window) => {
    console.log('ظهرت نافذة (GUI) للبوت، جاري تخطيها..');
    bot.closeWindow(window);
  });

  bot.on('kicked', (reason) => {
    console.log('تم طرد البوت، السبب:', reason);
  });

  bot.on('error', (err) => {
    console.log('حدث خطأ:', err);
  });

  bot.on('end', () => {
    console.log('انقطع الاتصال.. سيعود البوت للمحاولة بعد 10 ثوانٍ');
    setTimeout(createBot, 10000);
  });
}

createBot();
