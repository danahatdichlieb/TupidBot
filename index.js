import { bot } from "./bot.js";

async function start() {
  try {
    await bot.initialize();
  } catch (error) {
    console.error("Fehler beim Starten:", error);
    process.exit(1);
  }
}

start();
