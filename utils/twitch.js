import got from 'got';
import fs from "fs";

let config = null;

async function loadConfig() {
    if (!config) {
        const file = await fs.promises.readFile('./config.json', 'utf8');
        config = JSON.parse(file);
    }
    return config;
}

let helix = null;

async function createHelix() {
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

createHelix();

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
    const { data } = await helix.get(`streams?first=${number}&game_id=${game}`).json();
    return data;
};

export const GetTopGames = async (amount) => {
    try {
        const response = await helix.get(`games/top?first=${amount}`).json();
        return response.data;
    } catch (error) {
        return [];
    }
};


