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
        const cooldownKey = `${commandName}:${userId}`;
        if (await bot.cooldowns.has(cooldownKey)) {
            return;
        }
        await bot.cooldowns.set(cooldownKey, 10);

        let permissionMessage = "";
        switch (command.permission) {
            case bot.permissions.list.vip:
                permissionMessage = "Du musst VIP sein, um diesen Befehl zu benutzen.";
                break;
            case bot.permissions.list.mod:
                permissionMessage = "Du musst Moderator sein, um diesen Befehl zu benutzen.";
                break;
            case bot.permissions.list.broadcaster:
                permissionMessage = "Nur der Broadcaster kann diesen Befehl benutzen.";
                break;
            case bot.permissions.list.admin:
                permissionMessage = "Du musst Admin sein, um diesen Befehl zu benutzen.";
                break;
            case bot.permissions.list.superadmin:
                permissionMessage = "Nur der Super-Admin kann diesen Befehl benutzen.";
                break;
            case bot.permissions.list.owner:
                permissionMessage = "Nur der Owner kann diesen Befehl benutzen.";
                break;
            default:
                permissionMessage = "Du hast keine Berechtigung für diesen Befehl.";
        }

        await bot.chat.sendRaw(`PRIVMSG #${msg.channelName} :${permissionMessage}`);
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
            await presence(msg.channelID);
        }
    } catch (error) {
        console.error(`Fehler im Command ${commandName}:`, error);
    }
}
