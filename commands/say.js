import { IDByLogin } from "../utils/twitch.js";
import { sendMessage } from "../utils/twitch.js";

export default {
    name: "say",
    aliases: [],
    description: "sends a message in a channel",
    cooldown: 3,
    permission: 6,
    async execute(chat, msg, args) {
        if (!args || args.length < 2) {
            return { text: `FeelsDankMan` };
        }

        const channel = args[0].toLowerCase();
        const message = args.slice(1).join(' ');

        const userId = await IDByLogin(channel);
        if (!userId) {
            return { text: `FeelsDankMan channel @${channel} not found.` };
        }

        const sent = await sendMessage(userId, message);

        if (!sent) {
            return { text: `FeelsDankMan` };
        }

        return { text: `SeemsGood message send` };
    }
};
