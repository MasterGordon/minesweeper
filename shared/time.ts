export const formatTimeSpan = (timespan: number) => {
  const days = Math.floor(timespan / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timespan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timespan % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timespan % (1000 * 60)) / 1000);

  const result = [];

  if (days > 0) {
    result.push(`${days}d`);
  }

  if (hours > 0) {
    result.push(`${hours}h`);
  }

  if (minutes > 0) {
    result.push(`${minutes}m`);
  }

  if (seconds > 0) {
    result.push(`${seconds}s`);
  }

  if (result.length === 0) {
    return timespan + "ms";
  }

  return result.join(" ");
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export const formatRelativeTime = (date: number) => {
  const now = Date.now();
  const diff = date - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const hours = Math.ceil((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.ceil((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days <= -1) {
    return rtf.format(days, "day");
  }

  if (hours <= -1) {
    return rtf.format(hours, "hour");
  }

  if (minutes <= -1) {
    return rtf.format(minutes, "minute");
  }

  if (seconds <= -1) {
    return rtf.format(seconds, "second");
  }
  return "just now";
};
