export default {
  name: "joke",
  aliases: ["witz", "lachen"],
  description: "Erzählt einen zufälligen Witz",
  cooldown: 5,
  async execute(chat, msg) {
    try {
      const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single&lang=de");
      const data = await response.json();

      if (data && data.joke) {
        return { text: `${data.joke}` };
      } else {
        return { text: "NoNo" };
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  },
};
