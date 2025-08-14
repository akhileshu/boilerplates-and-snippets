export function toNumber(value: FormDataEntryValue | null) {
  return typeof value === "string" ? Number(value) : undefined;
}

export function toArray<T = string>(value: FormDataEntryValue | null): T[] {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Converts a value (Date, string, or FormDataEntryValue) to an ISO string.
 *
 * @param {FormDataEntryValue | string | Date | null | undefined} value - The input value to convert.
 * @returns {string | undefined} ISO formatted string, or `undefined` if invalid.
 *
 * @example
 * // From a form input
 * const dateStr = toISOString(formData.get("dob"));
 *
 * // From a string
 * const dateStr2 = toISOString("2025-08-01T14:30");
 *
 * // From a Date object
 * const dateStr3 = toISOString(new Date());
 */
export function toISOString(
  value: FormDataEntryValue | string | Date | null | undefined
): string | undefined {
  if (!value) return undefined;

  const str =
    typeof value === "string"
      ? value.trim()
      : value instanceof Date
      ? value.toISOString()
      : "";

  if (!str) return undefined;

  try {
    return new Date(str).toISOString();
  } catch {
    return undefined;
  }
}

/**
 * Adds minutes to a start ISO datetime string and returns new ISO end time.
 *
 * @param {string} startISO - Start time in ISO format (e.g. "2025-08-03T12:00:00.000Z")
 * @param {number} durationMinutes - Number of minutes to add
 * @returns {string} End time in ISO format
 *
 * @example
 * const end = addMinutesToISO("2025-08-03T12:00:00.000Z", 30);
 * // → "2025-08-03T12:30:00.000Z"
 */
export function addMinutesToISO(
  startISO: string | undefined,
  durationMinutes: number
): string | undefined {
  if (!startISO) return undefined;
  try {
    const startTime = new Date(startISO).getTime();
    const endTime = new Date(startTime + durationMinutes * 60000);
    return endTime.toISOString();
  } catch (error) {
    return undefined;
  }
}

/**
 *
 * @returns example '8/5/2025'
 */
export function dateToDateString(date: Date) {
  try {
    return new Date(date).toLocaleDateString();
  } catch (error) {
    return undefined;
  }
}

/**
 * when formdata field has multiple values, need to use formData.getAll(key)
 */
export function normalizeFromDateArrayFields(
  formData: FormData,
  parsedFormData: Record<string, any>,
  arrayKeys: string[]
) {
  arrayKeys.forEach((key) => {
    parsedFormData[key] = formData.getAll(key);
  });
}
