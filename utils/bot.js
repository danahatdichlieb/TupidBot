import { channels } from './channels.js';

export const bot = {
    channels: {
        channelsList: channels,
        getAll() {
            return this.channelsList;
        }
    },
    stats: { runningSince: Date.now() },
};