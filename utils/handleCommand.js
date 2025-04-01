import { bot } from './bot.js';

export async function handleCommand(chat, msg, commands, PREFIX) {
    if (!msg.messageText.startsWith(PREFIX)) return;

    const args = msg.messageText.slice(PREFIX.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();
    const command = commands.get(commandName);

    if (command) {
        const user = msg.username;
        const cooldownKey = `${user}:${commandName}`;

        if (bot.cooldowns.has(cooldownKey)) {
            return;
        }

        const commandCooldown = command.cooldown;
        bot.cooldowns.set(cooldownKey, commandCooldown);

        try {
            await command.execute(chat, msg, args);
        } catch (error) {
            console.error(`Fehler im Command ${commandName}:`, error);
        }
    }
}
