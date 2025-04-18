export function timeSince(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ${days === 1 ? 'Tag' : 'Tage'}, ${hours % 24} Stunden`;
    }
    if (hours > 0) {
        return `${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}, ${minutes % 60} Minuten`;
    }
    if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}, ${seconds % 60} Sekunden`;
    }
    return `${seconds} Sekunden`;
}

export function presence(channelId) {
    const data = {
        kind: 1,
        passive: true,
        session_id: "",
        data: { platform: "TWITCH", id: channelId },
    };

    return fetch(`https://7tv.io/v3/users/01JQMW0JPWGEA83RDFBZWED3NZ01JQMW0JPWGEA83RDFBZWED3NZ/presences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}