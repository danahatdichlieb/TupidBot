import Database from "../db/Database.js";

export default {
    name: "add",
    aliases: ["join"],
    description: "Added TupidBot in deinen Channel.",
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

                await chat.say(channelName, "peepoHappy TupidBot ist erfolgreich deinem Channel gejoined. Der Standardprefix ist „+“. Alle Commands des Bots findet man hier: https://tupidbot.vercel.app/");

                return {
                    text: `peepoHappy TupidBot ist dem Channel @${username} gejoined.`
                };
            } else {
                return {
                    text: `FeelsDankMan TupidBot ist bereits in deinem Channel.`
                };
            }

        } catch (error) {
            console.error("[add.js Fehler]", error);
            return {
                text: `Es ist ein Fehler aufgetreten.`
            };
        }
    }
};
