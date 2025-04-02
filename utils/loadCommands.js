import fs from "fs";

export async function loadCommands() {
    const commands = new Map();
    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    const commandArray = [];

    for (const file of commandFiles) {
        const command = await import(`../commands/${file}?${Date.now()}`);
        if (!command.default?.name) continue;

        commands.set(command.default.name, command.default);

        commandArray.push({
            name: command.default.name,
            description: command.default.description || "",
            aliases: command.default.aliases || []
        });

        for (const alias of command.default.aliases || []) {
            commands.set(alias, command.default);
        }
    }

    fs.writeFileSync("./data/commands.json", JSON.stringify(commandArray, null, 2));

    console.log(`✅ ${commands.size} Commands geladen!`);
    return commands;
}
