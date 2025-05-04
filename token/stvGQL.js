import got from 'got';
import fs from 'fs';

let client = null;
let config = null;

async function loadConfig() {
    if (!config) {
        const file = await fs.promises.readFile('./config.json', 'utf8');
        config = JSON.parse(file);
    }
    return config;
}

async function getClient() {
    if (!client) {
        const config = await loadConfig();

        const gql = got.extend({
            prefixUrl: 'https://7tv.io/v3/',
            throwHttpErrors: false,
            responseType: 'json',
            headers: {
                Authorization: `Bearer ${config.stv}`,
            },
        });

        async function makeRequest(query) {
            try {
                const gqlReq = await gql.post('gql', { json: query }).json();
                return gqlReq;
            } catch (error) {
                console.error('GraphQL:', error.message);
                return null;
            }
        }

        const GetEditorOfChannels = async (stvID) => {
            const query = {
                operationName: 'GetUserEditorOf',
                query: `query GetUserEditorOf($id: ObjectID!) {
					user(id: $id) {
						id
						editor_of {
							user {
								id
								username
								display_name
								roles
							}
						}
					}
				}`,
                variables: { id: stvID },
            };

            const res = await makeRequest(query);
            if (!res?.data?.user) {
                console.warn(`Keine Daten für STV-ID: ${stvID}`);
                return { editor_of: [] };
            }
            return res.data.user;
        };

        const GetChannelRoles = async (channelID) => {
            const query = {
                operationName: 'UserRolesCacheQuery',
                variables: {
                    channelID: channelID,
                    includeArtists: true,
                    includeEditors: false,
                    includeMods: false,
                    includeVIPs: false,
                },
                extensions: {
                    persistedQuery: {
                        version: 1,
                        sha256Hash: 'a0a9cd40e047b86927bf69b801e0a78745487e9560f3365fed7395e54ca82117',
                    },
                },
            };

            const res = await makeRequest(query);
            if (!res) {
                console.warn(`Fehler der Rollen für: ${channelID}`);
                return null;
            }

            return res;
        };

        const SearchSTVEmote = async (emote, exactMatch = false) => {
            const query = {
                variables: {
                    query: emote,
                    limit: 100,
                    page: 1,
                    filter: {
                        case_sensitive: true,
                        category: `TOP`,
                        exact_match: exactMatch,
                        ignore_tags: false,
                    },
                },
                operationName: 'SearchEmotes',
                query: `query SearchEmotes($query: String!, $page: Int, $limit: Int, $filter: EmoteSearchFilter) {
    emotes(query: $query, page: $page, limit: $limit, filter: $filter) {
        count
        items {
            id
            name
            listed
            owner {
                id
                username
                display_name
            }
        }
    }
}`,
            };
            const searchEmote = await makeRequest(query);
            return searchEmote;
        };

        const GetChannelEmotes = async (channelID) => {
            const query = {
                operationName: "UserEmotes",
                query: `query UserEmotes($id: ObjectID!) {
            user(id: $id) {
                emotes {
                    id
                    name
                    visibility
                    listed
                    mime
                    owner {
                        id
                        username
                        display_name
                    }
                }
            }
        }`,
                variables: { id: channelID },
            };

            const res = await makeRequest(query);
            if (!res?.data?.user?.emotes) {
                return [];
            }

            return res.data.user.emotes;
        };

        client = { GetEditorOfChannels, GetChannelRoles, SearchSTVEmote, GetChannelEmotes };
    }

    return client;
}

export async function GetEditorOfChannels(stvID) {
    const { GetEditorOfChannels } = await getClient();
    return await GetEditorOfChannels(stvID);
}

export async function GetChannelRoles(channelID) {
    const { GetChannelRoles } = await getClient();
    return await GetChannelRoles(channelID);
}

export async function SearchSTVEmote(emote, exactMatch = false) {
    const { SearchSTVEmote } = await getClient();
    return await SearchSTVEmote(emote, exactMatch);
}

export async function GetChannelEmotes(channelID) {
    const { GetChannelEmotes } = await getClient();
    return await GetChannelEmotes(channelID);
}

