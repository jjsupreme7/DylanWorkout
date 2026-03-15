import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function formatDate(date: string | Date) {
  const d = new Date(date);
  if (isToday(d)) return "Today";
  if (isYesterday(d)) return "Yesterday";
  return format(d, "MMM d, yyyy");
}

export function formatTime(date: string | Date) {
  return format(new Date(date), "h:mm a");
}

export function formatRelative(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDuration(minutes: number) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
}

export function formatWeight(value: number, unit = "lbs") {
  return `${value % 1 === 0 ? value : value.toFixed(1)} ${unit}`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}
