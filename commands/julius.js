const answers = ["julius stinkt.", "blxryer", "julius hat gerölpst"]

export default {
    name: 'julius',
    description: 'julius stinkt',
    async execute(client, msg) {
        client.say(msg.channelName, `@${msg.displayName} ${answers[Math.floor(Math.random() * answers.length)]}`);
    },
};
