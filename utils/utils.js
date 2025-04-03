export function timeSince(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "Tag" : "Tage"}, ${hours % 24} Stunden`;
  }
  if (hours > 0) {
    return `${hours} ${hours === 1 ? "Stunde" : "Stunden"}, ${
      minutes % 60
    } Minuten`;
  }
  if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}, ${
      seconds % 60
    } Sekunden`;
  }
  return `${seconds} Sekunden`;
}
