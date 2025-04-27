import { bot } from '../bot.js';
import { presence } from './utils.js';

export async function handleCommand(bot, msg, PREFIX) {
    if (!msg.messageText.startsWith(PREFIX)) return;

    const args = msg.messageText.slice(PREFIX.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName);

    if (!command) return;

    const userId = msg.senderUserID;
    const badges = msg.badges || [];
    const userPermissionLevel = bot.permissions.get(userId, badges);

    if (userPermissionLevel < command.permission) {
        console.log(`${msg.senderUsername} hat keine Berechtigung, diesen Befehl auszuführen.`);
        return;
    }

    const cooldownKey = `${msg.senderUsername}:${commandName}`;
    if (bot.cooldowns.has(cooldownKey)) {
        return;
    }

    const commandCooldown = command.cooldown;
    bot.cooldowns.set(cooldownKey, commandCooldown);

    try {
        const response = await command.execute(msg, args);
        if (response?.text) {
            await bot.chat.sendRaw(`PRIVMSG #${msg.channelName} :${response.text}`);
        }
    } catch (error) {
        console.error(`Fehler im Command ${commandName}:`, error);
    }
}
