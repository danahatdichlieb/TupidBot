export default {
    name: "timer",
    aliases: ["t"],
    description: "Setzt einen Timer",
    cooldown: 5,
    async execute(chat, msg, args) {
        const username = msg.ircPrefix.nickname.toLowerCase();
        const channelName = msg.channelName;

        if (!args[0]) {
            return { text: `FeelsDankMan Bsp.: +timer 10s oder +timer 10 s` };
        }

        let timeArg = args[0];
        let timeValue, unit, messageStartIndex = 1;

        const match = timeArg.match(/^(\d+)([a-zA-Z]+)$/);
        if (match) {
            timeValue = parseInt(match[1]);
            unit = match[2].toLowerCase();
        } else {
            if (!args[1]) {
                return { text: `FeelsDankMan Bsp.: +timer 10s oder +timer 10 s` };
            }
            timeValue = parseInt(args[0]);
            unit = args[1].toLowerCase();
            messageStartIndex = 2;
        }

        if (isNaN(timeValue) || timeValue <= 0) {
            return { text: `FeelsDankMan Ungültige Zeitangabe.` };
        }

        let duration = 0;

        if (["min", "minute", "minuten", "m"].includes(unit)) {
            duration = timeValue * 60;
        } else if (["sek", "sekunden", "sekunde", "s"].includes(unit)) {
            duration = timeValue;
        } else {
            return { text: `FeelsDankMan Benutze s oder min.` };
        }

        const message = args.slice(messageStartIndex).join("") || "";

        try {
            setTimeout(async () => {
                await chat.say(channelName, `@${username} ${message} DinkDonk`);
            }, duration * 1000);

            return {
                text: `ApuApustaja Timer für ${timeValue}${unit} gesetzt. ${message}`,
            };
        } catch (error) {
            console.error("[timer.js Fehler]", error);
        }
    },
};
