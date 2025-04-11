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

  return timeString.trim(); // Trim entfernt das letzte Leerzeichen
}
