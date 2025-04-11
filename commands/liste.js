import { Database } from '../db/Database.js';

export default {
    name: "liste",
    aliases: ["list"],
    description: "Fügt Benutzer zu gemein/nett hinzu oder entfernt sie oder zeigt die Liste.",
    cooldown: 5,
    async execute(chat, msg, args) {
        const list = args[0];
        const action = args[1];
        const targetUser = args[2]?.toLowerCase();

        if (!list || (list !== "gemein" && list !== "nett")) {
            return { text: "+liste <gemein/nett> <add/remove> <username>" };
        }

        if (!action) {
            try {
                const db = new Database();
                const result = await db.query(`SELECT username FROM ${list}`);
                if (result.length === 0) {
                    return { text: `Die Liste '${list}' ist leer.` };
                }
                const usernames = result.map(u => u.username).join(', ');
                return { text: `${list === 'gemein' ? "Gemeine" : "Nette"} Liste: ${usernames}` };
            } catch (error) {
                console.error("Fehler beim Abrufen der Liste:", error);
                return { text: "Fehler beim Abrufen der Liste." };
            }
        }

        if (!targetUser || (action !== "add" && action !== "remove")) {
            return { text: "+liste <gemein/nett> <add/remove> <username>" };
        }

        try {
            const db = new Database();
            const existingUser = await db.queryOne(`SELECT * FROM ${list} WHERE username = ?`, [targetUser]);

            if (action === "add") {
                if (existingUser) {
                    return { text: `${targetUser} ist bereits in der Liste '${list}'.` };
                }
                await db.query(`INSERT INTO ${list} (username) VALUES (?)`, [targetUser]);
                return { text: `${targetUser} wurde zur Liste '${list}' hinzugefügt. ApuApustaja` };
            }

            if (action === "remove") {
                if (!existingUser) {
                    return { text: `${targetUser} ist nicht in der Liste '${list}'.` };
                }
                await db.query(`DELETE FROM ${list} WHERE username = ?`, [targetUser]);
                return { text: `${targetUser} wurde aus der Liste '${list}' entfernt.` };
            }
        } catch (error) {
            console.error("Datenbankfehler:", error);
            return { text: "GULP" };
        }
    }
};
