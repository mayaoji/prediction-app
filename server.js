const TelegramBot = require('node-telegram-bot-api');

// 换成你的机器人 Token
const token = '8682160247:AAEMkVkMUQaEdeKPvSj__yIPopKEvFuuPb0';
const bot = new TelegramBot(token, { polling: true });

// 只要用户发任何消息，机器人都只回一个“进入网页”的按钮
bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, "🚀 欢迎来到中国预测市场！\n\n点击下方按钮，查看实时预测或发起新挑战：", {
        reply_markup: {
            inline_keyboard: [[
                { text: "👉 进入预测市场 (网页版)", web_app: { url: "https://mayaoji.github.io/prediction-app/" } }
            ]]
        }
    });
});

console.log("机器人入口已在线，正在等待用户点击...");
