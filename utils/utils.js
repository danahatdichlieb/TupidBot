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

export function timeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 1) return `${diffInYears} Jahre ${diffInMonths % 12} Monate und ${diffInDays % 30} Tagen`;
  if (diffInYears === 1) return `1 Jahr ${diffInMonths % 12} Monate und ${diffInDays % 30} Tagen`;
  if (diffInMonths > 1) return `${diffInMonths} Monate und ${diffInDays % 30} Tagen`;
  if (diffInMonths === 1) return `1 Monat und ${diffInDays % 30} Tage`;
  if (diffInDays > 0) return `${diffInDays} Tagen und ${diffInHours % 24} Stunden`;
  if (diffInHours > 0) return `${diffInHours} Stunden und ${diffInMinutes % 60} Minuten`;
  if (diffInMinutes > 0) return `${diffInMinutes} Minuten und ${diffInSeconds % 60} Sekunden`;
  return `${diffInSeconds} Sekunden`;
}
