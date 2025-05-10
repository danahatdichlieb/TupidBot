import Database from '../db/Database.js';
import { antiPing } from "../utils/utils.js";
import got from 'got';

export default {
    name: "liste",
    aliases: ["list"],
    description: "Add or remove a user from the mean/nice list, or display the list.",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const [list, action, rawUser] = args;
        const targetUser = rawUser?.toLowerCase();

        if (!["gemein", "nett"].includes(list)) {
            return { text: "+liste <gemein/nett> <add/remove> <username>" };
        }

        const db = new Database();

        if (!action) {
            try {
                const result = await db.query(`SELECT username FROM ${list}`);
                if (!result.length) return { text: `The ${list} list is currently empty.` };

                const usernames = result.map(u => u.username).join('\n');
                const { key } = await got.post("https://paste.ivr.fi/documents", {
                    responseType: "json",
                    body: usernames,
                }).json();

                return { text: `${list === "gemein" ? "Gemeine" : "Nette"} list: https://paste.ivr.fi/${key}` };
            } catch (err) {
                console.error(err);
                return { text: "Error fetching the list." };
            }
        }

        if (!["add", "remove"].includes(action) || !targetUser) {
            return { text: "+liste <gemein/nett> <add/remove> <username>" };
        }

        try {
            const userExists = await db.queryOne(`SELECT 1 FROM ${list} WHERE username = ?`, [targetUser]);

            if (action === "add") {
                if (userExists) return { text: `${antiPing(targetUser)} is already on the ${list} list.` };
                await db.query(`INSERT INTO ${list} (username) VALUES (?)`, [targetUser]);
                return { text: `ApuApustaja ${antiPing(targetUser)} was added to the ${list} list.` };
            }

            if (!userExists) return { text: `${antiPing(targetUser)} is not on the ${list} list.` };
            await db.query(`DELETE FROM ${list} WHERE username = ?`, [targetUser]);
            return { text: `${antiPing(targetUser)} was removed from the ${list} list.` };
        } catch (err) {
            console.error(err);
            return { text: "An error occurred." };
        }
    }
};
