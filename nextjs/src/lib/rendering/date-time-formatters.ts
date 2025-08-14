/**
 * Formats an ISO date string to a readable time (e.g., "08:20 AM")
 * @param isoString - ISO 8601 date string
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted time string
 *
 * isoString: string | Date, here also Date because prisma stores even isoString in Date Type
 */
function formatTime(
  isoString: string | Date,
  options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }
): string {
  if (!isoString) return "";

  try {
    return new Date(isoString).toLocaleTimeString([], options);
  } catch (e) {
    console.error("Error formatting time:", e);
    return "";
  }
}

/**
 * Formats minutes into a human-readable duration (e.g., "1h 15m")
 * @param minutes - Duration in minutes
 * @returns Formatted duration string
 */
function formatDuration(minutes: number): string {
  if (isNaN(minutes) || minutes < 0) return "";

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function getIsoToDatetimeLocal(iso: string) {
  try {
    const date = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } catch (error) {
    return undefined;
  }
}

/**
 * import { getIsoToDatetimeLocal } from "@/lib/rendering/date-time-formatters";
 */
export { formatTime, formatDuration, getIsoToDatetimeLocal };


