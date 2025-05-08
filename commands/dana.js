import fs from "fs";
import path from "path";

const danaData = JSON.parse(
  fs.readFileSync(path.resolve("data/dana.json"), "utf-8")
);

export default {
  name: "dana",
  description: "Random Picture of Dana",
  aliases: ["dana"],
  cooldown: 3,
  permission: 0,
  async execute(chat, msg, args) {
    const dana =
      danaData.data[Math.floor(Math.random() * danaData.data.length)];
    const response = msg.args?.length ? `${msg.args.join(" ")}, ${dana}` : dana;

    return { text: `peepoHappy ${response}` };
  },
};
