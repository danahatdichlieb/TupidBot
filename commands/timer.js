import Database from '../db/Database.js';

export default {
    name: "timer",
    aliases: ["t"],
    description: "Setzt einen Timer",
    cooldown: 5,
    permission: 0,
    async execute(chat, msg, args) {
        const username = msg.ircPrefix.nickname.toLowerCase();
        const channelName = msg.channelName;

        if (!args[0]) {
            return { text: `FeelsDankMan Bsp.: +timer 10s | +timer 1h | +timer um 18:30` };
        }

        const now = new Date();
        let duration = 0;
        let messageStartIndex = 1;
        let targetTime;

        if (args[0].toLowerCase() === "um" && args[1]) {
            const timeMatch = args[1].match(/^(\d{1,2}):(\d{2})$/);
            if (!timeMatch) {
                return { text: `FeelsDankMan Ungültige Uhrzeit` };
            }

            let [_, hour, minute] = timeMatch.map(Number);
            targetTime = new Date(now);
            targetTime.setHours(hour, minute, 0, 0);

            if (targetTime < now) {
                targetTime.setDate(targetTime.getDate() + 1);
            }

            duration = Math.floor((targetTime.getTime() - now.getTime()) / 1000);
            messageStartIndex = 2;
        } else {
            let timeArg = args[0];
            let timeValue, unit;

            const match = timeArg.match(/^(\d+)([a-zA-Z]+)$/);
            if (match) {
                timeValue = parseInt(match[1]);
                unit = match[2].toLowerCase();
            } else {
                if (!args[1]) {
                    return { text: `FeelsDankMan Bsp.: +timer 10s | +timer 1h | +timer um 18:30` };
                }
                timeValue = parseInt(args[0]);
                unit = args[1].toLowerCase();
                messageStartIndex = 2;
            }

            if (isNaN(timeValue) || timeValue <= 0) {
                return { text: `FeelsDankMan Ungültige Zeitangabe.` };
            }

            if (["h", "hour", "hours", "std", "stunde", "stunden"].includes(unit)) {
                duration = timeValue * 60 * 60;
            } else if (["min", "minute", "minuten", "m"].includes(unit)) {
                duration = timeValue * 60;
            } else if (["sek", "sekunden", "sekunde", "s"].includes(unit)) {
                duration = timeValue;
            } else {
                return { text: `FeelsDankMan Benutze s, m oder h.` };
            }
        }

        const message = args.slice(messageStartIndex).join(" ") || " ";

        try {
            const db = new Database();
            const fireAt = Math.floor(Date.now() / 1000) + duration;
            const timerId = await db.addTimer(username, channelName, message, fireAt);

            const minutesRemaining = Math.floor(duration / 60);
            const secondsRemaining = duration % 60;

            let timeText = '';
            if (minutesRemaining > 0) {
                timeText = `${minutesRemaining}m ${secondsRemaining}s`;
            } else {
                timeText = `${secondsRemaining}s`;
            }

            setTimeout(async () => {
                await chat.say(channelName, `DinkDonk @${username}, Timer abgelaufen ${message}`);
                await db.deleteTimer(timerId);
            }, duration * 1000);

            return {
                text: `ApuApustaja Timer für ${timeText} gesetzt. ${message}`,
            };
        } catch (error) {
            console.error("[timer.js Fehler]", error);
            return { text: `FeelsDankMan Fehler beim Setzen des Timers.` };
        }
    },
};
