import Database from '../db/Database.js';

export default {
    name: "part",
    description: "Lässt den Bot den Channel des Nutzers verlassen und entfernt ihn aus der Datenbank.",
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
                text: `peepoSad TupidBot hat Channel @${username} verlassen.`
            };
        } catch (error) {
            console.error("[part.js Fehler]", error);
            return {
            };
        }
    }
};
