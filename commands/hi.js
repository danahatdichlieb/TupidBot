export default {
    name: "hi",
    aliases: ["cmd"],
    description: "hi",
    cooldown: 5,
    async execute(chat, msg) {
        return { text: `hi` };
    }
};
