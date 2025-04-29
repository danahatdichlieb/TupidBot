import Database from '../db/Database.js';
import { bot } from '../bot.js'; // wichtig!

export default {
    name: "part",
    description: "Lässt den Bot den Channel des Nutzers verlassen und entfernt ihn aus der Datenbank.",
    cooldown: 30,
    permission: 0,
    async execute(msg, args) {
        const username = msg.channelName; // z. B. "kanalname"
        const channelName = `#${username}`;
        const db = new Database();

        try {
            await bot.chat.part(channelName);
            await db.query('DELETE FROM channels WHERE name = ?', [channelName]);

            return {
                text: `peepoSad TupidBot hat Channel @${username} verlassen.`
            };
        } catch (error) {
            console.error("[part.js Fehler]", error);
            return {
                text: "Fehler beim Verlassen des Channels."
            };
        }
    }
};
