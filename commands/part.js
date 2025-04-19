import Database from '../db/Database.js';

export default {
    name: "part",
    description: "Lässt den Bot den Channel des Nutzers verlassen und entfernt ihn aus der Datenbank.",
    cooldown: 30,
    async execute(chat, msg, args) {
        const username = msg.ircPrefix.nickname.toLowerCase();
        const channelName = `#${username}`;  // Channelname des Nutzers, der den Befehl ausführt
        const db = new Database();

        try {
            // Bot verlässt den Channel des Nutzers
            await chat.part(channelName);

            // Channel aus der Datenbank entfernen
            await db.query('DELETE FROM channels WHERE name = ?', [channelName]);

            return {
                text: `peepoSad TupidBot hat Channel @${username}} verlassen.`
            };
        } catch (error) {
            console.error("[part.js Fehler]", error);
            return {
            };
        }
    }
};
