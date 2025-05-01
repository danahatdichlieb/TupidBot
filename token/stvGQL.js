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
            prefixUrl: 'https://7tv.io/v3/', // Wichtig: prefixUrl statt url
            throwHttpErrors: false,
            responseType: 'json',
            headers: {
                Authorization: `Bearer ${config.stv}`,
            },
        });

        async function makeRequest(query) {
            try {
                const gqlReq = await gql.post('gql', { json: query }).json(); // Pfad muss hier nur "gql" sein
                return gqlReq;
            } catch (error) {
                console.error('GraphQL-Anfrage fehlgeschlagen:', error.message);
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

        client = { GetEditorOfChannels };
    }

    return client;
}

export async function GetEditorOfChannels(stvID) {
    const { GetEditorOfChannels } = await getClient();
    return await GetEditorOfChannels(stvID);
}
