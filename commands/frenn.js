const answers = ["https://imgur.com/NXpiK0f", "https://imgur.com/qsKbh37",
    "https://i.imgur.com/EPSyzRZ.png", "https://i.imgur.com/VVxWxsp.png", "https://i.imgur.com/hcjcMt8.png"]

export default {
    name: 'frenn',
    aliases: ['freunde'],
    description: 'Zeigt Bilder von echten Freunden',
    cooldown: 5,
    permission: 0,
    async execute(chat, msg, args) {
        return { text: `glorpNice ${answers[Math.floor(Math.random() * answers.length)]} frenn` };
    },
};
