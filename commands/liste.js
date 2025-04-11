import { Database } from '../db/Database.js';

export default {
    name: "liste",
    aliases: ["list"],
    description: "Fügt Benutzer zu gemein/nett hinzu oder entfernt sie.",
    cooldown: 5,
    async execute(chat, msg, args) {
        const db = new Database();
        const username = msg.ircPrefix.nickname.toLowerCase();
        const action = args[1];
        const list = args[0];
        const targetUser = args[2]?.toLowerCase();

        if (args.length === 0) {
            return { text: "+liste <add/remove> <gemein/nett> <username>" };
        }

        if (action && list && targetUser) {
            if (list !== "gemein" && list !== "nett") {
                return { text: `Fehler: Die Liste muss 'gemein' oder 'nett' sein.` };
            }

            try {
                if (action === "add") {
                    const existingUser = await db.queryOne(`SELECT * FROM ${list} WHERE username = ?`, [targetUser]);

                    if (existingUser) {
                        return { text: `${targetUser} ist bereits in der Liste '${list}'.` };
                    }

                    await db.query(`INSERT INTO ${list} (username) VALUES (?)`, [targetUser]);

                    return { text: `${targetUser} wurde zur Liste '${list}' hinzugefügt.` };
                }

                if (action === "remove") {
                    const existingUser = await db.queryOne(`SELECT * FROM ${list} WHERE username = ?`, [targetUser]);

                    if (!existingUser) {
                        return { text: `${targetUser} ist nicht in der Liste '${list}'.` };
                    }

                    await db.query(`DELETE FROM ${list} WHERE username = ?`, [targetUser]);

                    return { text: `${targetUser} wurde aus der Liste '${list}' entfernt.` };
                }

                return { text: "Verwende 'add' oder 'remove'." };
            } catch (error) {
                console.error("Datenbankfehler:", error);
                return { text: "GULP" };
            }
        }

        if (args.length === 1 && (args[0] === "gemein" || args[0] === "nett")) {
            try {
                const listsToShow = [];
                if (args[0] === "gemein") {
                    const gemeinList = await db.query(`SELECT username FROM gemein`);
                    listsToShow.push(`Gemeine Liste: ${gemeinList.map(user => user.username).join(', ')}`);
                }

                if (args[0] === "nett") {
                    const nettList = await db.query(`SELECT username FROM nett`);
                    listsToShow.push(`Nette Liste: ${nettList.map(user => user.username).join(', ')}`);
                }

                return { text: listsToShow.join("") || "Keine Benutzer in der Liste." };
            } catch (error) {
                console.error("Datenbankfehler:", error);
                return { text: "Fehler beim Abrufen der Listen." };
            }
        }

        return { text: "+liste <add/remove> <gemein/nett> <username>" };
    }
};
