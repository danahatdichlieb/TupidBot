import got from 'got';
import fs from 'fs';

let config = null;

async function loadConfig() {
    if (!config) {
        const file = await fs.promises.readFile('./config.json', 'utf8');
        config = JSON.parse(file);
    }
    return config;
}

export const GlobalEmote = () => {
    return '(7TV)';
};

export const getUser = async (name) => {
    if (!name) return null;

    try {
        const response = await got(`https://7tv.io/v3/users/twitch/${encodeURIComponent(name)}`, {
            responseType: 'json',
            throwHttpErrors: false,
            headers: {
                'User-Agent': 'MyApp/1.0 (contact@example.com)',
            },
        });

        if (!response?.body?.id) {
            console.warn(`Kein Benutzer mit Namen "${name}" gefunden.`);
            return null;
        }

        return response.body;
    } catch (err) {
        console.error('Fehler bei getUser:', err.message);
        return null;
    }
};
