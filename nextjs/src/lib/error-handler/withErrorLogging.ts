import { serializeError } from "@/lib/error-handler/serializeError";
import { logService } from "@/services/log";
import { LogArea, LogType } from "@/services/log/types";
type LogDataWithoutError = {
  message?: string;
  source?: string;
  area?: LogArea;
  type?: LogType;
  [key: string]: any;
};
/**
 * 
 * @usage 
 * ``` ts
 *      const [announcements, error] = await withErrorLogging(
         async () => {
           const res = await fetch("/announcements.json");
           return (await res.json()) as Announcement[];
         },
         {
           source: "useAnnouncementsBanner",
           area: "DATA_RENDERING",
           something: "else",
         }
       );
 
       if (!announcements || error) return; 
       console.log(announcements) // access response
       ```
       @params { message?: string;
  source?: string;
  area?: LogArea;
  type?: LogType;
  [key: string]: any; }

for Backend (Server/Edge/API routes):
will handle and log errors before sending a response

for Frontend (Client / React hooks / UI logic):
Use withErrorLogging() anywhere data fetching or logic is bug-prone or async.

 */

export async function withErrorLogging<T>(
  fn: () => Promise<T>,
  logData: LogDataWithoutError
): Promise<[T | null, Error | null]> {
  try {
    const data = await fn();
    return [data, null];
  } catch (error) {
    logService.logEvent({
      error: serializeError(error),
      ...logData,
    });
    return [null, error as Error];
  }
}
