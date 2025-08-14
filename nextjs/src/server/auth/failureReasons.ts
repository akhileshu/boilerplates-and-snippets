export type AuthFailureType =
  | "not-room-owner"
  | "not-admin"
  /*
  | "missing-subscription"
  | "account-inactive";
  */

type AuthFailureMeta = {
  code: AuthFailureType; // Machine ID
  title: string; // UI Heading
  message: (params: URLSearchParams) => string; // UI message
  redirectTo: string;
  buildContext?: (args: any) => Record<string, string>;
  //   action?: string; // What the user was trying to do (optional) ex : edit room details
};
export type WithRoom = {
  room: {
    id: string;
    name: string;
  };
};


export const authFailures: Record<AuthFailureType, AuthFailureMeta> = {
  "not-room-owner": {
    code: "not-room-owner",
    redirectTo: "/unauthorized",
    buildContext: ({ room }: WithRoom) => ({
      roomId: room.id,
      roomName: room.name,
    }),
    title: "Room Access Denied",
    message: (params) =>
      `You are not the creator of "${params.get("roomName") ?? "this room"}".`,
  },
  "not-admin": {
    code: "not-admin",
    redirectTo: "/unauthorized",
    title: "Admin Access Only",
    message: () =>
      "You must be an admin to view this page or perform this action.",
  },
};
