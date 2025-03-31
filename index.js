import { ChatClient } from "@mastondzn/dank-twitch-irc";
import { loadCommands } from "./utils/loadCommands.js";
import { handleCommand } from "./utils/handleCommand.js";
import { channels } from "./utils/channels.js";
import { stats } from "./utils/stats.js";
import { timeSince } from "./utils/utils.js";
import fs from "fs";

const config = JSON.parse(await fs.promises.readFile("config.json", "utf8"));
const PREFIX = "+";

const chat = new ChatClient({
    username: config.USERNAME,
    password: config.PASSWORD,
    connection: { type: "websocket", secure: true }
});

const commands = await loadCommands();

chat.on("ready", () => console.log("TupidBot joined!"));
chat.on("close", (error) => error && console.error("Fehler:", error));

chat.on("PRIVMSG", async (msg) => {
    handleCommand(chat, msg, commands, PREFIX)
    console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);
});

async function startBot() {
    await chat.connect();
    channels.forEach(channel => chat.join(channel));
}

startBot();