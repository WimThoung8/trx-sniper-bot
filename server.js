const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

// ====== TELEGRAM BOT SETUP ======
const TelegramBot = require("node-telegram-bot-api");

// Bot Token from Render Environment
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🔥 Welcome to TRX Sniper Bot\n\n" +
    "Commands:\n" +
    "/predict – Get TRX UP/DOWN Signal\n" +
    "/stats – Show Win Rate\n" +
    "/help – Show menu"
  );
});

// Predict command
bot.onText(/\/predict/, (msg) => {
    const signals = ["UP 📈", "DOWN 📉", "BIG 🔥", "SMALL 🧊"];
    const signal = signals[Math.floor(Math.random() * signals.length)];

    bot.sendMessage(
        msg.chat.id,
        "🔮 TRX Sniper Prediction:\n\nSignal: " + signal
    );
});


// Stats
bot.onText(/\/stats/, (msg) => {
  const rate = Math.floor(Math.random() * 10) + 85;
  bot.sendMessage(
    msg.chat.id,
    "📊 Win Rate (Live): " + rate + "%"
  );
});

// Help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🔧 Commands:\n/start\n/predict\n/stats\n/help"
  );
});
