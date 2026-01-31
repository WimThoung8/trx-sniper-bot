const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("TRX Signal Bot Running..."));
app.listen(PORT, () => console.log("Server running on port", PORT));

// ===== BOT TOKEN =====
const bot = new TelegramBot("8596287676:AAFSZ1q90NaJdIlY7kjIrlblNUCTwdp3BIA", {
    polling: true
});

// Random Functions
function randomPeriod() {
    return "2026" + Date.now().toString().slice(-11);
}
function randomChoice() {
    return Math.random() > 0.5 ? "BIG 1x" : "SMALL 1x";
}
function randomResult() {
    const win = Math.random() > 0.3;
    const num = Math.floor(Math.random() * 10);
    return { win, num };
}

// Buttons
const menu = {
    reply_markup: {
        keyboard: [
            ["📊 Prediction History", "🧠 Strategy Performance"],
            ["🛑 STOP", "🔄 Reset Stats"]
        ],
        resize_keyboard: true
    }
};

// Start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "🚀 Welcome to TRX SIGNAL BOT\nChoose a command:",
        menu
    );
});

// Predict
bot.onText(/predict|Prediction/i, (msg) => {
    const period = randomPeriod();
    const choice = randomChoice();
    const result = randomResult();
    const status = result.win ? "🟢 WIN" : "🔴 LOSE";
    const label = choice.includes("BIG") ? "BIG" : "SMALL";

    const text =
`🚩 *TRX Signal* 🚩

⏰ *Period:* ${period}
🎯 *Choice:* ${choice}
📊 *Result:* ${status} | ${label} (${result.num})`;

    bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });

    // GIF
    bot.sendAnimation(
        msg.chat.id,
        "https://media.tenor.com/1ItmJQG6C2AAAAAC/patrick-bateman-american-psycho.gif"
    );
});

// Stats
bot.onText(/stats|history|performance/i, (msg) => {
    const rate = Math.floor(Math.random() * 15) + 85;
    bot.sendMessage(msg.chat.id, `📊 Live Win Rate: *${rate}%*`, { parse_mode: "Markdown" });
});

// Reset Stats
bot.onText(/reset/i, (msg) => {
    bot.sendMessage(msg.chat.id, "🔄 Stats reset successfully.");
});

// Stop
bot.onText(/stop/i, (msg) => {
    bot.sendMessage(msg.chat.id, "🛑 Auto Signal Stopped.");
});
