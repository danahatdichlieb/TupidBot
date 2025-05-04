import dotenv from 'dotenv';
import axios from 'axios';
import { timeAgo } from "../utils/utils.js";

export default {
    name: "user",
    aliases: ["u"],
    description: "Zeigt Informationen zum Benutzer",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const username = args.length > 0 ? args[0] : msg.ircPrefix.nickname.toLowerCase();

        const accessToken = process.env.TWITCH_ACCESS_TOKEN;
        const clientId = process.env.TWITCH_CLIENT_ID;

        try {
            const response = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
                headers: {
                    'Client-ID': clientId,
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.data.data.length === 0) {
                return { text: `Benutzer ${username} nicht gefunden.` };
            }

            const user = response.data.data[0];

            const shortenedDescription = user.description.length > 30 ? user.description.slice(0, 30) + '...' : user.description;

            const messages = [
                `imGlitch @${user.display_name} | ID: ${user.id} | Bio: ${shortenedDescription || "Keine Beschreibung"}`,
                `Erstellt vor: ${timeAgo(user.created_at)}`
            ];

            return { text: messages.join(" | ") };
        } catch (error) {
            console.error("Fehler beim Abrufen der User-Daten:", error.response?.data || error.message);
            return { text: "Olrite." };
        }
    }
};
