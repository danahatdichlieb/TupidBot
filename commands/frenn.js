import { bot } from "../utils/bot.js";

const answers = ["https://imgur.com/NXpiK0f", "https://imgur.com/qsKbh37",
    "https://i.imgur.com/EPSyzRZ.png", "https://i.imgur.com/VVxWxsp.png", "https://i.imgur.com/hcjcMt8.png"]

export default {
    name: 'frenn',
    aliases: ['freunde'],
    description: 'frenn',
    cooldown: 5,
    async execute(client, msg) {
        client.say(msg.channelName, `@${msg.displayName} nise ${answers[Math.floor(Math.random() * answers.length)]} frenn`);
    },
};
