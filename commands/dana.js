import fs from "fs";
import path from "path";

const danaData = JSON.parse(fs.readFileSync(path.resolve("data/dana.json"), "utf-8"));

export default {
    name: "dana",
    description: "zufälliges Bild von Dana",
    aliases: ["dana"],
    async execute(chat, msg, args) {
        const dana = danaData.data[Math.floor(Math.random() * danaData.data.length)];
        const response = msg.args?.length ? `${msg.args.join(" ")}, ${dana}` : dana;

        chat.say(msg.channelName,`@${msg.displayName} SoCute ${response} patpat`);
    },
};
