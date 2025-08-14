/**

✅ 1. Google Recurring Event Format
Google uses the recurrence field in requestBody, like this:


```ts
recurrence: ["RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10"]
```
FREQ: DAILY / WEEKLY / MONTHLY

BYDAY: MO, TU, WE, TH, FR, SA, SU

COUNT: total number of occurrences (or use UNTIL for end date)

📝 daysOfWeek must use:

| Label     | RFC Value |
| --------- | --------- |
| MONDAY    | `MO`      |
| TUESDAY   | `TU`      |
| WEDNESDAY | `WE`      |
| THURSDAY  | `TH`      |
| FRIDAY    | `FR`      |
| SATURDAY  | `SA`      |
| SUNDAY    | `SU`      |

*/
export function getGoogleCalenderRRULE({
  pattern,
  daysOfWeek = [],
  datesOfMonth = [],
  count = 10, // or set `until`
}: {
  pattern: "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY";
  daysOfWeek?: string[];
  datesOfMonth?: number[];
  count?: number;
}) {
  let rule = "RRULE:";

  switch (pattern) {
    case "DAILY":
      rule += `FREQ=DAILY;COUNT=${count}`;
      break;
    case "WEEKLY":
      rule += `FREQ=WEEKLY;BYDAY=${daysOfWeek.join(",")};COUNT=${count}`;
      break;
    case "BIWEEKLY":
      rule += `FREQ=WEEKLY;INTERVAL=2;BYDAY=${daysOfWeek.join(
        ","
      )};COUNT=${count}`;
      break;
    case "MONTHLY":
      rule += `FREQ=MONTHLY;BYMONTHDAY=${datesOfMonth.join(
        ","
      )};COUNT=${count}`;
      break;
  }

  return [rule]; // Google expects array
}
