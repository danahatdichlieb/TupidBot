export function timeSince(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} Tag(e), ${hours % 24} Stunden`;
    if (hours > 0) return `${hours} Stunde(n), ${minutes % 60} Minuten`;
    if (minutes > 0) return `${minutes} Minute(n), ${seconds % 60} Sekunden`;
    return `${seconds} Sekunden`;
}
