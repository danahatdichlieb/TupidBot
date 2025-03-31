import fs from "fs";

const config = JSON.parse(await fs.promises.readFile("config.json", "utf8"));

import { ChatClient } from "@mastondzn/dank-twitch-irc";

const USERNAME = config.USERNAME;
const PASSWORD = config.PASSWORD;
const chat = new ChatClient({
    username: USERNAME,
    password: PASSWORD,
    rateLimits: "default",
    connection: { type: "websocket", secure: true },
    requestMembershipCapability: false,
    ignoreUnhandledPromiseRejections: true
});

chat.on("ready", () => console.log("danaabot ready!"));
chat.on("close", (error) => {
    if (error) {
        console.error("❌ Fehler:", error);
    }
});
chat.on("PRIVMSG", async (msg) => {
    console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);

    if (msg.displayName.toLowerCase() !== USERNAME.toLowerCase()) {

        if (msg.messageText === "hi"){
            chat.say(msg.channelName, "hi");
        }
        if (msg.messageText === "Olrite"){
            chat.say(msg.channelName, "Olritey ");
        }
        if (msg.messageText === "why"){
            chat.say(msg.channelName, "why not ");
        }
    }
});

async function startBot() {
    await chat.connect();

    setTimeout(() => {
        chat.join("danahatdichlieb", "danahatdichlieb");
    }, 2000);
}

startBot();
