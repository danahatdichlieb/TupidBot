export default {
  name: "commands",
  aliases: ["cmd"],
  description: "Link zur TupidBot Website",
  cooldown: 5,
  async execute(chat, msg) {
    return { text: `DA https://tupidbot.vercel.app/` };
  },
};
