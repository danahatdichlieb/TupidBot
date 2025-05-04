const answers = ["julius stinkt.", "blxryer", "julius hat gerölpst", "patpat"];

export default {
  name: "julius",
  description: "julius stinkt",
  cooldown: 3,
  permission: 0,
  async execute(chat, msg, args) {
    return { text: answers[Math.floor(Math.random() * answers.length)] };
  },
};
