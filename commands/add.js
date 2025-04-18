import fs from 'fs';
import { channels } from '../utils/channels.js';

export default {
    name: "add",
    aliases: ["join"],
    description: "Added TupidBot in deinen Channel.",
    cooldown: 5,
    async execute(chat, msg, args) {
        const username = msg.ircPrefix.nickname.toLowerCase();
        const channelToAdd = `#${username}`;

        if (!channels.includes(channelToAdd)) {
            channels.push(channelToAdd);

            fs.writeFile('./utils/channels.js', `export const channels = ${JSON.stringify(channels, null, 2)};`, (err) => {
                if (err) {
                    return { text: `not Olrite}` };
                } else {
                    return { text: `Olrite` };
                }
            });
        } else {
            return { text: `FeelsDankMan TupidBot ist bereits im Channel "${username}".` };
        }
    },
};
