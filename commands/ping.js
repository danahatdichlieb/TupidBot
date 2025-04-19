import { timeSince } from "../utils/utils.js";
import { stats } from "../utils/stats.js";
import { bot } from "../utils/bot.js";

export default {
  name: "ping",
  description: "pong",
  aliases: ["pong"],
  cooldown: 3,
  async execute(chat, msg, args) {
    // Warten, bis die Kanäle aus der Datenbank abgerufen wurden
    const channels = await bot.channels.getAll();
    const channelsCount = channels.length;

    const messages = [
      "ApuApustaja",
      `Uptime: ${timeSince(stats.runningSince)}`,
      `${channelsCount} Channels`,
    ];

    return { text: messages.join(" | ") };
  },
};
