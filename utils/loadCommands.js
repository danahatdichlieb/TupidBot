import fs from "fs";

export async function loadCommands() {
    const commands = new Map();
    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = await import(`../commands/${file}?${Date.now()}`);
        if (!command.default?.name) continue;

        commands.set(command.default.name, command.default);

        for (const alias of command.default.aliases || []) {
            commands.set(alias, command.default);
        }
    }

    console.log(`✅ ${commands.size} Commands geladen!`);
    return commands;
}
