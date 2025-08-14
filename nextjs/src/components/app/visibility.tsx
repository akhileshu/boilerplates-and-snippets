import { RoomVisibility } from "@prisma/client";
import { EyeOff, Globe, Lock } from "lucide-react";

export function Visibility({ visibility }: { visibility: RoomVisibility }) {
  return (
    <>
      {visibility === "PUBLIC" ? (
        <Globe className="h-4 w-4 ml-2 text-green-500" />
      ) : visibility === "PRIVATE" ? (
        <Lock className="h-4 w-4 ml-2 text-yellow-500" />
      ) : (
        <EyeOff className="h-4 w-4 ml-2 text-red-500" />
      )}
    </>
  );
}
