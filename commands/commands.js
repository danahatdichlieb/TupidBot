export default {
  name: "commands",
  aliases: ["cmd"],
  description: "Link zur TupidBot Website",
  cooldown: 3,
  permission: 0,
  async execute(chat, msg) {
    return { text: `glorpNice https://tupidbot.vercel.app/` };
  },
};
