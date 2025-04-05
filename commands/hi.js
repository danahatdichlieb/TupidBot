export default {
  name: "hi",
  aliases: [],
  description: "TupidBot sagt hi",
  cooldown: 5,
  async execute(chat, msg) {
    return { text: `hi` };
  },
};
