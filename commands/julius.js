const answers = ["julius stinkt.", "blxryer", "julius hat gerölpst"]

export default {
    name: 'julius',
    description: 'julius stinkt',
    cooldown: 5,
    async execute(client, msg) {
        return { text: answers[Math.floor(Math.random() * answers.length)] };
    },
};
