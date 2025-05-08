import Database from "../db/Database.js";

export default {
    name: "add",
    aliases: ["join"],
    description: "Add TupidBot to your channel.",
    cooldown: 10,
    permission: 0,
    async execute(chat, msg, args) {
        const username = msg.ircPrefix.nickname.toLowerCase();
        const channelName = `#${username}`;

        const db = new Database();

        try {
            const existing = await db.query(
                `SELECT name FROM channels WHERE name = ? LIMIT 1`,
                [channelName]
            );

            if (existing.length === 0) {
                await db.query(`INSERT INTO channels (name) VALUES (?)`, [channelName]);

                await chat.join(channelName);

                await chat.say(channelName, "peepoHappy TupidBot has successfully joined your channel. The default prefix is '+'. You can find all bot commands here: https://tupidbot.vercel.app/");

                return {
                    text: `peepoHappy TupidBot has joined the channel @${username}.`
                };
            } else {
                return {
                    text: `FeelsDankMan TupidBot is already in your channel.`
                };
            }

        } catch (error) {
            console.error("[add.js Fehler]", error);
        }
    }
};
