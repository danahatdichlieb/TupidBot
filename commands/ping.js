import { timeSince } from "../utils/utils.js";
import { stats } from "../utils/stats.js";
import { bot } from "../bot.js";

export default {
  name: "ping",
  description: "pong",
  aliases: ["pong"],
  cooldown: bot.cooldowns.veryShort,
  permission: bot.permissions.superadmin,
  async execute(chat, msg, args) {
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
