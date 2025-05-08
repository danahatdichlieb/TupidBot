export default {
  name: "hi",
  aliases: [],
  description: "TupidBot says hi",
  cooldown: 3,
  permission: 0,
  async execute(chat, msg, args) {
    return { text: `hi` };
  },
};
