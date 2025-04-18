import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, 'api/.env') });
import { ChatClient } from "@mastondzn/dank-twitch-irc";
import { loadCommands } from "./utils/loadCommands.js";
import { handleCommand } from "./utils/handleCommand.js";
import { channels } from "./utils/channels.js";
import { stats } from "./utils/stats.js";
import { timeSince, timeAgo } from "./utils/utils.js";
import { Cooldown } from "./utils/cooldown.js";
import Database from './db/Database.js';
import fs from "fs";

const config = JSON.parse(await fs.promises.readFile("config.json", "utf8"));
const PREFIX = "+";

class Bot {
  constructor() {
    this.commands = new Map();
    this.channels = new Channels();
    this.cooldown = new Cooldown();
    this.config = config;
    this.utils = new Utils();
    this.db = new Database();
  }

  async initialize() {
    await this.db.initialize();

    await Promise.all([
      (this.uptime = new Date()),
      this.loadCommands(),
      this.channels.initialize(),
      this.client.initialize(),
      this.permissions.initialize(),
    ]);
  }
}

const chat = new ChatClient({
  username: config.USERNAME,
  password: config.PASSWORD,
  connection: { type: "websocket", secure: true },
});

const commands = await loadCommands();

chat.on("ready", () =>
    console.log(`TupidBot joined in ${channels.length} Channels!`)
);
chat.on("close", (error) => error && console.error("Fehler:", error));

chat.on("PRIVMSG", async (msg) => {
  handleCommand(chat, msg, commands, PREFIX);
  console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);
});

async function startBot() {
  await chat.connect();
  channels.forEach((channel) => chat.join(channel));
}

startBot();
