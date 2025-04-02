export default {
    name: "commands",
    aliases: ["Link zur TupidBot Website"],
    description: "hi",
    cooldown: 5,
    async execute(chat, msg) {
        return { text: `DA https://tupidbot.vercel.app/` };
    }
};