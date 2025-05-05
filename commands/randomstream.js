import humanizeDuration from '../utils/humanizeDuration.js';
import { GetFirstStreams, GetTopGames } from '../utils/twitch.js';

export default {
    name: "randomstream",
    aliases: ["rs"],
    description: "Gibt einen random Stream",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const topGames = await GetTopGames(100);

        if (!topGames || topGames.length === 0) {
            return {
                text: "Es konnte kein Spiel gefunden werden. Versuche es später nochmal.",
                reply: true,
            };
        }

        const getRandomGame = topGames[Math.floor(Math.random() * topGames.length)];
        const data2 = await GetFirstStreams(100, getRandomGame['id']);

        if (!data2 || data2.length === 0) {
            return {
                text: "Es konnte kein Stream für dieses Spiel gefunden werden.",
                reply: true,
            };
        }

        const random = data2[Math.floor(Math.random() * data2.length)];
        const { user_name, started_at, game_name, viewer_count, user_login, title } = random;
        const ms = new Date().getTime() - Date.parse(started_at);

        const shortenedTitle = title.length > 30 ? title.slice(0, 30) + '...' : title;

        return {
            text: `ApuApustaja @${user_name} ist seit ${humanizeDuration(ms, 2)} live | Spielt ${game_name} mit ${viewer_count} Zuschauern | Titel: ${shortenedTitle} | twitch.tv/${user_login} | nymnCorn  `,
            reply: true,
        };
    },
};
