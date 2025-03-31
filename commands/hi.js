export default {
    name: "hi",
    aliases: ["hello"],
    description: "Sagt Hallo",
    async execute(chat, msg) {
        chat.say(msg.channelName, `Hey @${msg.displayName}, wie geht’s? 👋`);
    }
};
