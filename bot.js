import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { timeSince, timeAgo } from "./utils/utils.js";
import { ChatClient } from "@mastondzn/dank-twitch-irc";
import { loadCommands } from "./utils/loadCommands.js";
import { handleCommand } from './utils/handleCommand.js';
import { Cooldown } from "./utils/cooldown.js";
import Permissions from "./utils/permissions.js";
import Database from "./db/Database.js";
import fs from "fs";
import Channels from './utils/channels.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, 'api/.env') });
const config = JSON.parse(await fs.promises.readFile("config.json", "utf8"));

const PREFIX = "+";

class Bot {
    constructor() {
        this.config = config;
        this.db = new Database();
        this.cooldowns = new Cooldown();
        this.permissions = new Permissions();
        this.channels = new Channels();
        this.commands = new Map();
        this.chat = new ChatClient({
            username: config.USERNAME,
            password: config.PASSWORD,
            connection: {type: "websocket", secure: true},
        });
    }

    async initialize() {
        await this.permissions.initialize(this.db);
        await this.channels.initialize(this.db);

        const commands = await loadCommands();
        commands.forEach((cmd, name) => this.commands.set(name, cmd));

        this.chat.on("PRIVMSG", async (msg) => {
            await handleCommand(this, this.chat, msg, this.commands, PREFIX);
            console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);
        });

        const activeTimers = await this.db.getActiveTimers();
        activeTimers.forEach(timer => {
            const delay = timer.fireAt - Math.floor(Date.now() / 1000);
            if (delay > 0) {
                setTimeout(async () => {
                    await this.chat.say(timer.channel, `DinkDonk | @${timer.username} | Timer expired ⏰ | Message: ${timer.message}`);
                    await this.db.deleteTimer(timer.id);
                }, delay * 1000);
            }
        });

        await this.chat.connect();

        const channelList = await this.db.query("SELECT name FROM channels");
        for (const {name} of channelList) {
            await this.chat.join(name);
            console.log(`Joined Channel: ${name}`);
        }

        console.log("TupidBot gestartet");
    }
}

export const bot = new Bot();