export default {
    name: "hi",
    aliases: ["hii"],
    description: "hi",
    async execute(chat, msg) {
        chat.say(msg.channelName, `@${msg.displayName} hi`);
    }
};
