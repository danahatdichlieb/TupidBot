import { getUser, GlobalEmote } from '../token/stvREST.js';
import { ParseUser, IDByLogin } from '../utils/twitch.js';
import { GetEditorOfChannels } from '../token/stvGQL.js';
import humanizeDuration from '../utils/humanizeDuration.js';
import {antiPing} from "../utils/utils.js";

export default {
    name: "7tvuser",
    aliases: ["7tvu", "stvu", "s"],
    description: "Zeigt 7tv Informationen zu einem Benutzer",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const Emote = GlobalEmote();
        const targetUser = ParseUser(args.length > 0 ? args[0] : msg.ircPrefix.nickname.toLowerCase());
        const uid = await IDByLogin(targetUser);

        const stvInfo = await getUser(uid);
        if (!stvInfo) {
            return {
                text: `${Emote} - ${targetUser} UNKNOWN USER`,
                reply: true,
            };
        }

        const { user, emote_set } = stvInfo;
        const { id, created_at } = user;

        const emoteSet = emote_set
            ? `${emote_set.emote_count}/${emote_set.capacity}`
            : 'Emote Set nicht verfügbar';

        const { editor_of } = await GetEditorOfChannels(id);

        const createdAt = humanizeDuration(new Date().getTime() - created_at, 2);

        const editorLabel = editor_of.length === 1 ? 'Channel' : 'Channels';

        return {
            text: `${Emote} ${antiPing(targetUser)} - ${id} | Created ${createdAt} Ago | Emote Set:  ${emoteSet} used | Editor of ${editor_of.length} ${editorLabel}`,
            reply: true,
        };
    },
};
