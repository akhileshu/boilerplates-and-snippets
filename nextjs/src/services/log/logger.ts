"use server";
import fs from "fs";
import path from "path";
import { LogData } from "./types";

const LOG_DIR = path.resolve(process.cwd(), "src/services/log");
const LOG_FILE = path.join(LOG_DIR, "analytics.csv");

/**
* ### 📄 CSV Log Format
 *
 * | Timestamp           | Type  | Message | Error Message                                            | Error Name                   | Error Stack                                             | Source                | Area                | Extra                 | Frequency |
 * |---------------------|-------|---------|-----------------------------------------------------------|------------------------------|---------------------------------------------------------|------------------------|----------------------|------------------------|-----------|
 * | 7/27/2025, 4:42:16 PM | ERROR |         | Unexpected token '<', "<!DOCTYPE "... is not valid JSON | SyntaxError                  | SyntaxError: Unexpected token '<'...                  | useAnnouncementsBanner | DATA_RENDERING       | {"something":"else"}  | 2         |
 * | 7/27/2025, 4:42:12 PM | ERROR |         | Invalid `myPrisma.user.findMany()` invocation in ...      | PrismaClientInitializationError | PrismaClientInitializationError: Invalid `...`       |                        | SERVER_ACTION_FETCH  | {}                    | 1         |
 *
 * - ✅ CSV-friendly format
 * - 🧠 Useful for analyzing repeat errors and stack traces
 * 
 * ### PotentialFutureFeatureAdditions
 * | Feature                    | Benefit                               |
| -------------------------- | ------------------------------------- |
| `duration` field           | Track API / server action performance |
| `env` or `buildId`         | Useful in multi-env CI or staging     |
| Upload to S3 / remote logs | For long-term centralized logging     |
| CSV to JSON exporter       | For analysis via scripts / dashboards |

### when to use a logging/tracking library 
- Later, if you need production-level alerting or remote error reporting, add Sentry or Pino on top.
Sent to a remote dashboard
- Grouped, tracked, and displayed with stack trace, frequency, browser info, etc.
- You get alerts (Slack, email) when new or frequent bugs happen.

### ✅ Best Practice (Recommended)
Use a hybrid approach:

🔍 Your logger for:

Local dev

Controlled offline environments

Custom analytics (e.g. CSV analysis, patterns)

☁️ Remote service for:

Real-time error visibility

Alerting, dashboards, tracking over time
 */
let logEventFlag = false;
export async function logEvent(data: LogData) {
  if (!logEventFlag) return;
  let { message, error, type, source, area, ...extraData } = data;

  if (process.env.NODE_ENV === "development") {
    try {
      if (!message && !error && Object.keys(extraData).length === 0) return;

      if (!fs.existsSync(LOG_FILE)) {
        // fs.mkdirSync(LOG_DIR, { recursive: true });
        fs.writeFileSync(
          LOG_FILE,
          `"Timestamp","Type","Message","Error Message","Error Name","Error Stack","Source","Area","Extra","Frequency"\n`
        );
      }
      if (!type) error?.message ? (type = "error") : (type = "info");
      const timestamp = new Date().toLocaleString();

      function getSafe(data: any) {
        try {
          if (typeof data !== "string") {
            data = JSON.stringify(data);
          }

          const original = data;
          const shortened = data.slice(0, 200).replaceAll("\n", "  |  ");
          const result = original.length > 200 ? shortened + "..." : shortened;

          return result.replace(/"/g, '""'); // CSV-safe
        } catch {
          return "";
        }
      }

      const rawFields = {
        message,
        errorMessage: error?.message,
        errorName: error?.name,
        errorStack: error?.stack,
        source,
        area,
        extraData: extraData,
      };

      const safeFields = Object.fromEntries(
        Object.entries(rawFields).map(([key, value]) => [key, getSafe(value)])
      );

      const newRow: string[] = [
        "", // placeholder for timestamp
        type.toUpperCase(),
        safeFields.message,
        safeFields.errorMessage,
        safeFields.errorName,
        safeFields.errorStack,
        safeFields.source,
        safeFields.area,
        safeFields.extraData,
        "", // placeholder for frequency
      ];

      // Read existing logs
      const lines = fs
        .readFileSync(LOG_FILE, "utf8")
        .split("\n")
        .filter(Boolean);
      const headers = lines[0];
      const rows = lines
        .slice(1)
        .map((line) =>
          line
            .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
            .map((v) => v.replace(/^"|"$/g, ""))
        );

      let found = false;
      let frequencyCoumnIndex = 9;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Compare columns except timestamp and frequency (indexes: 0 and indexBeforeFrequency)
        if (
          row.slice(1, frequencyCoumnIndex).join() ===
          newRow.slice(1, frequencyCoumnIndex).join()
        ) {
          row[0] = timestamp; // update timestamp
          row[frequencyCoumnIndex] = String(
            (parseInt(row[frequencyCoumnIndex]) || 1) + 1
          ); // increment frequency
          rows[i] = row;
          found = true;
          break;
        }
      }

      if (!found) {
        newRow[0] = timestamp;
        newRow[frequencyCoumnIndex] = "1";
        rows.push(newRow);
      }

      // Write back all rows
      const updatedCSV = [
        headers,
        ...rows.map((row) => row.map((v) => `"${v}"`).join(",")),
      ].join("\n");
      fs.writeFileSync(LOG_FILE, updatedCSV, "utf8");
    } catch (err) {
      console.error("Failed to write analytics log:", err);
    }
  }

  try {
    // Example: pushing to Google Tag Manager, Plausible, etc.
    // window?.gtag?.("event", event, data);
    // Or: plausible(event, { props: data });
  } catch (err) {
    console.error("Analytics log failed:", err);
  }
}
