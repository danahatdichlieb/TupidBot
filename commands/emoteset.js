import { getUser, GlobalEmote } from "../token/stvREST.js";
import { IDByLogin, ParseUser } from "../utils/twitch.js";
import {antiPing} from "../utils/utils.js";

export default {
    name: "emoteset",
    aliases: ["set"],
    description: "Gibt Informationen zu deinem Aktiven 7tv-Emote-Set",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const Emote = GlobalEmote();
        const targetUser = ParseUser(args.length > 0 ? args[0] : msg.ircPrefix.nickname.toLowerCase());
        const uid = await IDByLogin(targetUser);

        const setInfo = await getUser(uid);
        if (!setInfo) {
            return {
                text: `User ${targetUser} nicht gefunden`,
                reply: true,
            };
        }

        const emote_set = setInfo;
        const setId = emote_set.emote_set.id;
        const setlink = `https://7tv.app/emote-sets/${setId}`;
        const setName = emote_set.emote_set.name;
        const emoteSet = emote_set
            ? `${emote_set.emote_set.emote_count}/${emote_set.emote_set.capacity}`
            : `Emote Set nicht gefunden`;

        return {
            text: `${Emote} ${antiPing(targetUser)} - Emote Set: ${emoteSet} | Name: ${setName} | Link: ${setlink} | ${setId}  `,
            reply: true,
        };
    },
};
