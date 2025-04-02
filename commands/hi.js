export default {
    name: "hi",
    aliases: ["hii"],
    description: "hi",
    cooldown: 5,
    async execute(chat, msg) {
        return { text: `hi` };
    }
};
