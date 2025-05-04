import fs from "fs";

import { timeSince } from "../utils/utils.js";
import { stats } from "../utils/stats.js";
import { bot } from "../bot.js";
import { loadCommands } from "../utils/loadCommands.js";

export default {
  name: "ping",
  description: "pong",
  aliases: ["pong"],
  cooldown: 3,
  permission: 0,
  async execute(chat, msg, args) {
    const channels = await bot.channels.getAll();
    const channelsCount = channels.length;
    const commands = await loadCommands();
    const commandFiles = await fs.promises.readdir("./commands");

    const messages = [
      "ApuApustaja",
      `Uptime: ${timeSince(stats.runningSince)}`,
      `${channelsCount} Channels`,
      `${commandFiles?.length} Commands`
    ];

    return { text: messages.join(" | ") };
  },
};
