import { SearchSTVEmote } from "../token/stvGQL.js";

export default {
    name: "emotelink",
    aliases: ["link"],
    description: "Link zu einem 7TV-Emote aus dem Channel",
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
            const emotesResponse = await SearchSTVEmote(emoteName);

            const emotes = emotesResponse?.data?.emotes?.items || [];

            const emote = emotes.find(e => e.name.toLowerCase() === emoteName.toLowerCase());

            if (!emote) {
                return {
                    text: `Emote ${emoteName} nicht gefunden.`,
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