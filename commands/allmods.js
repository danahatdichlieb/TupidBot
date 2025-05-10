import got from 'got';
import { ParseUser } from '../utils/twitch.js';

export default {
    name: "mods",
    aliases: ["vips"],
    description: "Shows a list of all moderators/vips in a channel.",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const targetUser = ParseUser(args[0] ?? msg.ircPrefix?.nickname?.toLowerCase());
        if (!/^[A-Z_\d]{2,26}$/i.test(targetUser)) {
            return {
                text: 'malformed username parameter',
                reply: true,
            };
        }

        try {
            const { body: getModsNVips } = await got.get(`https://api.ivr.fi/v2/twitch/modvip/${targetUser}?skipCache=false`, {
                throwHttpErrors: false,
                responseType: 'json',
                headers: {
                    'User-Agent':
                        'forsen.',
                },
            });

            const modsMapped = getModsNVips.mods.map((x) => x.login + ' (' + x.grantedAt.split('T')[0] + ')' + ' - [MOD]');
            const vipsMapped = getModsNVips.vips.map((x) => x.login + ' (' + x.grantedAt.split('T')[0] + ')' + ' - [VIP]');
            const modsNvipsMapped = modsMapped.concat(vipsMapped);

            const { key } = await got
                .post(`https://paste.ivr.fi/documents`, {
                    responseType: 'json',
                    body: modsNvipsMapped.join('\n'),
                })
                .json();

            return {
                text: `${modsMapped.length} mods, ${vipsMapped.length} VIPs in channel @${targetUser} - https://paste.ivr.fi/${key} `,
                reply: true,
            };
        } catch (e) {
            console.log(e);
            return {
                text: 'FeelsDankMan Channel not found',
                reply: true,
            };
        }
    },
};
