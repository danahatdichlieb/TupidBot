import { timeSince } from "../utils/utils.js";
import { stats } from "../utils/stats.js";
import { bot } from "../utils/bot.js";

console.log(bot)
console.log(bot.cooldowns.veryLong);

export default {
    name: "ping",
    description: "pong",
    aliases: ["pong"],
    cooldown: bot.cooldowns.short,
    async execute(chat, msg, args) {
        const uptime = timeSince(stats.runningSince);
        const channelsCount = bot.channels.getAll().length;

        chat.say(msg.channelName, `@${msg.displayName}  🏓 PONG | Uptime: ${uptime} | ${channelsCount} Channels | INZOIPsyCat`);
    }
};
