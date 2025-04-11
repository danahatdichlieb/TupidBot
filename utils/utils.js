export function timeSince(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "d" : "d"}, ${hours % 24}h`;
  }
  if (hours > 0) {
    return `${hours} ${hours === 1 ? "h" : "h"}, ${
      minutes % 60
    }m`;
  }
  if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "m" : "m"}, ${
      seconds % 60
    }s`;
  }
  return `${seconds}s`;
}
