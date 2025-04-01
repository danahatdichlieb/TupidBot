import { bot } from './bot.js';

export async function handleCommand(chat, msg, commands, PREFIX) {
    if (!msg.messageText.startsWith(PREFIX)) return;

    const args = msg.messageText.slice(PREFIX.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();
    const command = commands.get(commandName);

    if (command) {
        const user = msg.username;

        // Cooldown-Check
        if (bot.cooldowns.has(user)) {
            console.log("COOLDOWN!!!")
            return;
        }

        bot.cooldowns.set(user, bot.cooldowns.durations.short);

        try {
            await command.execute(chat, msg, args);
        } catch (error) {
            console.error(`Fehler im Command:`, error);
        }
    }
}