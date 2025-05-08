import dotenv from 'dotenv';
import axios from 'axios';
import { timeAgo } from "../utils/utils.js";

export default {
    name: "user",
    aliases: ["u"],
    description: "Shows details about the user.",
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
                return {
                    text: `FeelsDankMan user @${username} not found.`,
                    reply: true,
                }
            }

            const user = response.data.data[0];

            const shortenedDescription = user.description.length > 30 ? user.description.slice(0, 30) + '...' : user.description;

            const messages = [
                `imGlitch @${user.display_name} | ID: ${user.id} | Bio: ${shortenedDescription || "no description"}`,
                `Created: ${timeAgo(user.created_at)} ago`
            ];

            return { text: messages.join(" | ") };
        } catch (error) {
            return { text: `FeelsDankMan user @${username} not found.` };
        }
    }
};
