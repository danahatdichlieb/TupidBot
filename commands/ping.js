import { timeSince } from "../utils/utils.js";
import { stats } from "../utils/stats.js";
import { bot } from "../utils/bot.js";

export default {
    name: "ping",
    description: "pong",
    aliases: ["pong"],
    cooldown: 3,
    async execute(chat, msg, args) {
        const uptime = timeSince(stats.runningSince);
        const channelsCount = bot.channels.getAll().length;

        chat.say(msg.channelName, `@${msg.displayName}  🏓 PONG | Uptime: ${uptime} | ${channelsCount} Channels | INZOIPsyCat`);
    }
};
