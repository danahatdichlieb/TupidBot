export default {
  name: "commands",
  aliases: ["help"],
  description: "links to TupidBot website",
  cooldown: 3,
  permission: 0,
  async execute(chat, msg) {
    return { text: `ApuApustaja https://tupidbot.vercel.app/` };
  },
};
