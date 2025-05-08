import {getChannelEmotes} from "../token/stvGQL.js";
import emoteset from "./emoteset.js";

export default {
    name: "emotelink",
    aliases: ["link"],
    description: "Returns a link to a 7TV emote used in the channel.",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        if (!args[0]) {
            return {
                text: `+link <emotename>`,
                reply: true,
            };
        }

        const emoteName = args[0];

        try {
            const emoteSet = await getChannelEmotes(msg.channelID);

            const emote = emoteSet.emotes.items.find(e => e.alias === emoteName);

            if (!emote) {
                return {
                    text: `Emote ${emoteName} not found.`,
                    reply: true,
                };
            }

            const link = `https://7tv.app/emotes/${emote.id}`;
            return {
                text: `${emoteName} ${link}`,
                reply: true,
            };
        } catch (err) {
            console.error(err);
        }
    }
}