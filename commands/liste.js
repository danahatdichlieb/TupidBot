import Database from '../db/Database.js';
import {antiPing} from "../utils/utils.js";

export default {
    name: "liste",
    aliases: ["list"],
    description: "Add or remove a user from the mean/nice list, or display the list.",
    cooldown: 3,
    permission: 0,
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
                    return { text: `The list ${list} is currently empty.` };
                }
                const usernames = result.map(u => u.username).join(', ');
                return { text: `${list === 'gemein' ? "Gemeine" : "Nette"} Liste: ${usernames}` };
            } catch (error) {
                console.error(error);
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
                    return { text: `${antiPing(targetUser)} is already on the ${list} list` };
                }
                await db.query(`INSERT INTO ${list} (username) VALUES (?)`, [targetUser]);
                return { text: `ApuApustaja ${antiPing(targetUser)} is now in the ${list} list` };
            }

            if (action === "remove") {
                if (!existingUser) {
                    return { text: `${antiPing(targetUser)} is not in the ${list}.` };
                }
                await db.query(`DELETE FROM ${list} WHERE username = ?`, [targetUser]);
                return { text: `${antiPing(targetUser)} was removed from the ${list} list.` };
            }
        } catch (error) {
            console.error(error);
        }
    }
};
