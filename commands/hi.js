export default {
    name: "hi",
    aliases: ["hii"],
    description: "hi",
    cooldown: 5,
    async execute(chat, msg) {
        chat.say(msg.channelName, `@${msg.displayName} hi`);
    }
};
