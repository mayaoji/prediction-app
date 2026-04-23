const TelegramBot = require('node-telegram-bot-api');
const { createClient } = require('@supabase/supabase-js');

// 配置信息
const token = '8682160247:AAEMkVkMUQaEdeKPvSj__yIPopKEvFuuPb0';
const supabaseUrl = 'https://kfalyawduveuuttniun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYWx5YXdkdXZldXV0dG5paXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODE2MjQsImV4cCI6MjA5MjQ1NzYyNH0.YdlWOljkvsimq628KSxw99bpvmyN8Bsdza15uFoEs_0';

const bot = new TelegramBot(token, { polling: true });
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("机器人后端已启动...");

// 监听指令
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "欢迎来到中国预测市场！🚀\n\n点击下方按钮即可发起或查看预测。", {
        reply_markup: {
            inline_keyboard: [[
                { text: "打开预测市场", web_app: { url: "https://mayaoji.github.io/prediction-app/" } }
            ]]
        }
    });
});

// 监听前端传来的“支付成功”信号
bot.on('message', async (msg) => {
    if (msg.web_app_data) {
        const data = JSON.parse(msg.web_app_data.data);
        if (data.type === 'create_market') {
            const { topic, pool } = data;
            const { error } = await supabase.from('markets').insert([{ topic, pool }]);
            
            if (!error) {
                bot.sendMessage(msg.chat.id, `✅ 收到信号！话题【${topic}】已成功发布到云端。`);
            } else {
                bot.sendMessage(msg.chat.id, "❌ 后端写入数据库失败：" + error.message);
            }
        }
    }
});
