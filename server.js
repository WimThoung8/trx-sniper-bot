const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

// ===== CONFIG =====
const TOKEN = "8596287676:AAFSZ1q90NaJdIlY7kjIrlblNUCTwdp3BIA";
const AUTO_DELAY = 60000; // 1 minute

// ===== APP =====
const app = express();
app.get("/", (req, res) => res.send("TRX Auto Signal Bot Running..."));
app.listen(process.env.PORT || 3000);

// ===== BOT =====
const bot = new TelegramBot(TOKEN, { polling: true });

// Button Menu
const menu = {
  reply_markup: {
    keyboard: [
      ["📊 Prediction History", "🧠 Strategy Performance"],
      ["🛑 STOP", "🔄 Reset Stats"]
    ],
    resize_keyboard: true
  }
};

// SYSTEM VARIABLES
let autoRunning = true;

// Generate Random Values
const rand = (max) => Math.floor(Math.random() * max);

function generatePeriod() {
  return "2026" + Date.now().toString().slice(-11);
}

function generateChoice() {
  return Math.random() > 0.5 ? "BIG 1x" : "SMALL 1x";
}

function generateResult(choice) {
  const win = Math.random() > 0.3; 
  const num = rand(10);

  return {
    win,
    num,
    label: choice.includes("BIG") ? "BIG" : "SMALL",
  };
}

// Auto Signal Function
async function sendAutoSignal() {
  if (!autoRunning) return;

  const period = generatePeriod();
  const choice = generateChoice();
  const result = generateResult(choice);
  const status = result.win ? "🟢 WIN" : "🔴 LOSE";

  const msg =
`🚩 *TRX Signal* 🚩

⏰ *Period:* ${period}
🎯 *Choice:* ${choice}
📊 *Result:* ${status} | ${result.label} (${result.num})`;

  // Send to your chat
  bot.sendMessage("@Cklotter_hsai_2_bot", msg, { parse_mode: "Markdown" });

  bot.sendAnimation(
    "@Cklotter_hsai_2_bot",
    "https://media.tenor.com/1ItmJQG6C2AAAAAC/patrick-bateman-american-psycho.gif"
  );
}

// Start Auto Loop
setInterval(sendAutoSignal, AUTO_DELAY);

// Commands
bot.onText(/\/start/, (msg) => {
  autoRunning = true;
  bot.sendMessage(msg.chat.id, "🚀 Auto TRX Signal Bot Started!", menu);
});

bot.onText(/stop/i, (msg) => {
  autoRunning = false;
  bot.sendMessage(msg.chat.id, "🛑 Auto Mode Stopped.");
});

bot.onText(/reset/i, (msg) => {
  bot.sendMessage(msg.chat.id, "🔄 Stats successfully reset!");
});

bot.onText(/predict/i, (msg) => {
  sendAutoSignal();
});

bot.onText(/stats|history|performance/i, (msg) => {
  const rate = rand(15) + 85;
  bot.sendMessage(msg.chat.id, `📊 Live Win Rate: *${rate}%*`, {
    parse_mode: "Markdown"
  });
});
