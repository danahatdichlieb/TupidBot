async function getChannelEmotes(channelId) {
    const query = `{
            users {
                userByConnection(platform: TWITCH, platformId: "${channelId}") {
                    style {
                        activeEmoteSet {
                            id
                            name
                            capacity
                            emotes {
                                items {
                                    id
                                    alias
                                }
                                totalCount
                            }
                        }
                    }
                }
            }
        }`;


    const url = 'https://7tv.io/v4/gql';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return data.data.users.userByConnection.style.activeEmoteSet;
}

export default {
    name: "emotelink",
    aliases: ["link"],
    description: "Link zu einem 7TV-Emote aus dem Channel",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        if (!args[0]) {
            return {
                text: `+link <emotename>`,
                reply: true,
            };
        }

        const emoteName = args[0];

        try {
            const emoteSet = await getChannelEmotes(emoteName);

            const emote = emoteSet.emotes.items.find(e => e.alias === emoteName);

            if (!emote) {
                return {
                    text: `Emote ${emoteName} nicht gefunden.`,
                    reply: true,
                };
            }

            const link = `https://7tv.app/emotes/${emote.id}`;
            return {
                text: `${emoteName} ${link}`,
                reply: true,
        };
        } catch (err) {
            console.error(err);
        }
    }
}