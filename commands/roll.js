export default {
    name: "roll",
    aliases: ["dice", "würfel"],
    description: "Würfelt eine Zahl zwischen 1 und 100",
    async execute(chat, msg, args) {
        const username = msg.displayName;
        const number = Math.floor(Math.random() * 100) + 1;
        chat.say(msg.channelName, `@${username}, du hast eine ${number} geworfen! 🎲`);
    }
};
