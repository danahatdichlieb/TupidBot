fetch("./commands.json")
    .then((response) => response.json())
    .then((commands) => {
        const container = document.getElementById("commands-list");
        commands.forEach((cmd) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <strong>${cmd.name}</strong> <br>
                <p>${cmd.description}</p>
                <em>Aliases: ${cmd.aliases.join(", ") || "none"}</em> <br>
                <rm>Cooldown: ${cmd.cooldown || ""}</rm>
            `;
            container.appendChild(div);
        });
    })
    .catch((error) => console.error("Fehler beim Laden der Commands:", error));
