export default {
    name: "vanity",
    aliases: [],
    description: "Vanity of an user",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const user = args.length > 0 ? args[0] : msg.ircPrefix.nickname.toLowerCase();

        return { text: `🎨🖌️ https://vanity.zonian.dev/?u=${user}` };
    },
};
