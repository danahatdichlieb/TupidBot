import Database from '../db/Database.js';
import { Cooldown } from "./cooldown.js";

export const bot = {
  channels: {
    async getAll() {
      const db = new Database();
      return await db.query("SELECT name FROM channels");
    },
  },
  stats: { runningSince: Date.now() },

  cooldowns: new Cooldown(),
};
