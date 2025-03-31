export default {
    name: "hi",
    aliases: ["hi"],
    description: "hi",
    async execute(chat, msg) {
        chat.say(msg.channelName, `@${msg.displayName} hi`);
    }
};
