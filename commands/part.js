import Database from '../db/Database.js';

export default {
    name: "part",
    description: "Bot leaves the user's channel",
    cooldown: 10,
    permission: 0,
    async execute(chat, msg, args) {
        const username = msg.ircPrefix.nickname.toLowerCase();
        const channelName = `#${username}`;
        const db = new Database();

        try {
            await chat.part(channelName);

            await db.query('DELETE FROM channels WHERE name = ?', [channelName]);

            return {
                text: `peepoSad TupidBot left channel @${username}.`
            };
        } catch (error) {
            console.error(error);
            return {
            };
        }
    }
};
