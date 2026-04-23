const http = require('http');
// 专门给 Render 准备的“假窗口”，防止它报错超时
http.createServer((req, res) => {
  res.write('Bot is alive!');
  res.end();
}).listen(10000); 

// --- 以下是你原本的机器人代码 ---
const TelegramBot = require('node-telegram-bot-api');
// ... 后面的代码保持不变 ...

const TelegramBot = require('node-telegram-bot-api');
const { createClient } = require('@supabase/supabase-js');

// 配置信息
const token = '8682160247:AAEMkVkMUQaEdeKPvSj__yIPopKEvFuuPb0';
const supabaseUrl = 'https://kfalyawduveuuttniun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYWx5YXdkdXZldXV0dG5paXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODE2MjQsImV4cCI6MjA5MjQ1NzYyNH0.YdlWOljkvsimq628KSxw99bpvmyN8Bsdza15uFoEs_0';

const bot = new TelegramBot(token, { polling: true });
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("🚀 机器人云端大脑已在 Render 启动！");

// 监听指令
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "欢迎来到中国预测市场！🚀\n\n数据现在由云端中转，即便手机网络报错，数据也会成功写入！", {
        reply_markup: {
            inline_keyboard: [[
                { text: "打开预测市场", web_app: { url: "https://mayaoji.github.io/prediction-app/" } }
            ]]
        }
    });
});

// 核心：处理来自网页的信号
bot.on('message', async (msg) => {
    if (msg.web_app_data) {
        const data = JSON.parse(msg.web_app_data.data);
        if (data.type === 'create_market') {
            const { topic, pool } = data;
            const { error } = await supabase.from('markets').insert([{ topic, pool }]);
            
            if (!error) {
                bot.sendMessage(msg.chat.id, `✅ 云端同步成功！话题【${topic}】已安全存入数据库。`);
            } else {
                bot.sendMessage(msg.chat.id, "❌ 云端写入失败：" + error.message);
            }
        }
    }
});
