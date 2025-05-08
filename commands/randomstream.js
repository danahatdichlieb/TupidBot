import humanizeDuration from '../utils/humanizeDuration.js';
import { GetFirstStreams, GetTopGames } from '../utils/twitch.js';

export default {
    name: "randomstream",
    aliases: ["rs"],
    description: "Shows a random stream",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const topGames = await GetTopGames(100);
        const getRandomGame = topGames[Math.floor(Math.random() * topGames.length)] || {};
        const data2 = await GetFirstStreams(100, getRandomGame['id']);
        const random = data2[Math.floor(Math.random() * data2.length)] || {};

        const { user_name = 'Unknown', started_at = new Date(), game_name = 'Unknown', viewer_count = 0, user_login = 'unknown', title = 'No Title' } = random;
        const ms = new Date().getTime() - Date.parse(started_at);
        const shortenedTitle = title.length > 30 ? title.slice(0, 30) + '...' : title;

        return {
            text: `ApuApustaja @${user_name} has been live for ${humanizeDuration(ms, 2)} | Playing ${game_name} with ${viewer_count} viewers | Title: ${shortenedTitle} | twitch.tv/${user_login} | nymnCorn`,
            reply: true,
        };
    },
};

