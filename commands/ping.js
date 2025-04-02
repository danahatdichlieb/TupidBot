import { timeSince } from "../utils/utils.js";
import { stats } from "../utils/stats.js";
import { bot } from "../utils/bot.js";

export default {
    name: "ping",
    description: "pong",
    aliases: ["pong"],
    cooldown: 3,
    async execute(chat, msg, args) {
        const channelsCount = bot.channels.getAll().length;

        const messages = [
            '🏓 PONG',
            `Uptime: ${timeSince(stats.runningSince)}`,
            `${channelsCount} Channels`,
            'INZOIPsyCat'
        ];

        return { text: messages.join(' | ') };
    }
};
