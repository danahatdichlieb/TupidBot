import got from 'got';
import fs from 'fs';

let config = null;
let helix = null;

async function loadConfig() {
    if (!config) {
        const file = await fs.promises.readFile('./config.json', 'utf8');
        config = JSON.parse(file);
    }
    return config;
}

export async function createHelix() {
    if (!helix) {
        const config = await loadConfig();
        helix = got.extend({
            prefixUrl: 'https://api.twitch.tv/helix/',
            throwHttpErrors: false,
            responseType: 'json',
            headers: {
                'Client-ID': config.client_id,
                Authorization: `Bearer ${config.oauth}`,
            },
        });
    }
    return helix;
}

export const IDByLogin = async (username) => {
    if (!username) return null;

    const { body } = await got(`https://api.ivr.fi/v2/twitch/user?login=${encodeURIComponent(username)}`, {
        responseType: 'json',
        throwHttpErrors: false,
        headers: {
            'User-Agent': 'Forsen.',
        },
    });

    if (!body[0]?.id || body?.length === 0 || body?.error) return null;
    return body[0].id;
};

export const ParseUser = (user) => {
    const parsed = user.replace(/[@#,]/g, '');
    return parsed.toLowerCase();
};

export const GetFirstStreams = async (number, game) => {
    if (!helix) await createHelix();

    const response = await helix.get('streams', {
        searchParams: {
            first: number,
            game_id: game
        }
    });

    return response.body?.data || [];
};

export const GetTopGames = async (amount) => {
    if (!helix) await createHelix();

    try {
        const response = await helix.get('games/top', {
            searchParams: {
                first: amount
            }
        });
        return response.body?.data || [];
    } catch (error) {
        return [];
    }
};

export const sendMessage = async (channelId, message, replyMsgId) => {
    const config = await loadConfig();
    const helix = await createHelix();

    const response = await helix.post('chat/messages', {
        json: {
            broadcaster_id: channelId,
            sender_id: config.uid,
            message,
            reply_parent_message_id: replyMsgId || undefined
        }
    });

    if (response.statusCode !== 200) {
        console.error(response.body);
        return null;
    }

    return response.body?.data?.[0] || null;
};

