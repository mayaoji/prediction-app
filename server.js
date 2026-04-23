const TelegramBot = require('node-telegram-bot-api');

// 机器人 Token
const token = '8682160247:AAEMkVkMUQaEdeKPvSj__yIPopKEvFuuPb0';
const bot = new TelegramBot(token, { polling: true });

// 简化逻辑：无论用户发什么，只回一个进入网页的按钮
bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, "🚀 欢迎回来！系统已升级为【全网共享网页版】。\n\n点击下方按钮进入市场：", {
        reply_markup: {
            inline_keyboard: [[
                { text: "👉 进入预测市场", web_app: { url: "https://mayaoji.github.io/prediction-app/" } }
            ]]
        }
    });
});
