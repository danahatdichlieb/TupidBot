import { bot } from './bot.js';
import { presence } from './utils.js';

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
            const response = await command.execute(chat, msg, args);
            if (response?.text) {
                await chat.sendRaw(`@reply-parent-msg-id=${msg.messageID} PRIVMSG #${msg.channelName} ${response.text}`);

                await presence(msg.channelID);
            }
        } catch (error) {
            console.error(`Fehler im Command ${commandName}:`, error);
        }
    }
}
