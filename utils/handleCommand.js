export async function handleCommand(chat, msg, commands, PREFIX) {
    if (!msg.messageText.startsWith(PREFIX)) return;

    const args = msg.messageText.slice(PREFIX.length).trim().split(" ");
    const command = commands.get(args.shift().toLowerCase());

    if (command) {
        try {
            await command.execute(chat, msg, args);
        } catch (error) {
            console.error(`❌ Fehler im Command:`, error);
        }
    }
}
