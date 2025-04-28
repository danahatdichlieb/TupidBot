export default {
  name: "hi",
  aliases: ["hi"],
  description: "TupidBot sagt hi",
  cooldown: 5,
  permission: 0,
  async execute(chat, msg) {
    return { text: `hi` };
  },
};
