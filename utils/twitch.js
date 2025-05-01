import got from 'got';

export const IDByLogin = async (username) => {
    if (!username) return null;
    const { body } = await got(`https://api.ivr.fi/v2/twitch/user?login=${encodeURIComponent(username)}`, {
        responseType: 'json',
        throwHttpErrors: false,
        headers: {
            'User-Agent':
                'Forsen.',
        },
    });
    if (!body[0]?.id || body?.length === 0 || body?.error) return null;
    return body[0].id;
};

export const ParseUser = (user) => {
    const parsed = user.replace(/[@#,]/g, ''); // Remove @, #, and ,
    return parsed.toLowerCase();
};
