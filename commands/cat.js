import fetch from 'node-fetch';

export default {
    name: "cat",
    aliases: ["catfact"],
    description: "Gibt einen Random Fact zu Katzen",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {

        const res = await fetch("https://catfact.ninja/fact");
        const data = await res.json();
        return {
            text: `🐱👉 ${data.fact}`
        }
    },
};
