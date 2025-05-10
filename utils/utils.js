export function timeSince(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeString = '';

    if (days > 0) {
        timeString += `${days}d `;
    }
    if (hours > 0 || days > 0) {
        timeString += `${hours % 24}h `;
    }
    if (minutes > 0 || hours > 0 || days > 0) {
        timeString += `${minutes % 60}m `;
    }
    timeString += `${seconds % 60}s`;

    return timeString.trim();
}

export function timeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    const units = [
        { label: "y", seconds: 31536000 },
        { label: "mo", seconds: 2592000 },
        { label: "d", seconds: 86400 },
        { label: "h", seconds: 3600 },
        { label: "m", seconds: 60 },
        { label: "s", seconds: 1 }
    ];

    let remaining = diffInSeconds;
    const result = [];

    for (const unit of units) {
        const value = Math.floor(remaining / unit.seconds);
        if (value > 0) {
            result.push(`${value}${unit.label}`);
            remaining %= unit.seconds;
        }
        if (result.length === 2) break;
    }

    return result.length ? `${result.join(" ")} ago` : "just now";
}


export async function presence(channelId) {
    const data = {
        kind: 1,
        passive: true,
        session_id: "",
        data: { platform: "TWITCH", id: channelId },
    };

    try {
        const res = await fetch(`https://7tv.io/v3/users/01JQMW0JPWGEA83RDFBZWED3NZ/presences`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            console.warn(`status ${res.status}`);
        }

        return res;
    } catch (error) {
        console.warn("⚠️  Fehler Senden der Präsenz:", error.message);
        return null;
    }
}

export function antiPing(text = '') {
    const [start = '', ...rest] = text;
    const end = rest.pop() || '';

    return `${start}\u{E0000}${rest.join('')}${rest.length ? '\u{E0000}' : ''}${end}`;
}