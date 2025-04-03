import { channels } from "./channels.js";
import { Cooldown } from "./cooldown.js";

export const bot = {
  channels: {
    channelsList: channels,
    getAll() {
      return this.channelsList;
    },
  },
  stats: { runningSince: Date.now() },

  cooldowns: new Cooldown(),
};
