import { timeSince } from "../utils/utils.js";
import { stats } from "../utils/stats.js";
import { bot } from "../utils/bot.js";

export default {
    name: "ping",
    description: "pong",
    aliases: ["pong"],
    async execute(chat, msg, args) {
        const uptime = timeSince(stats.runningSince);
        const channelsCount = bot.channels.getAll().length;

        chat.say(msg.channelName, `🏓 PONG! Der Bot läuft seit: ${uptime} in ${channelsCount} channels!`);
    }
};
