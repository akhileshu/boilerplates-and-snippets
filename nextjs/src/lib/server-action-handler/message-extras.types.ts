/**
 * 🔮 Future-Proofing
As your app grows, not all actions will fit cleanly into CRUD. You might want to introduce:

| Operation   | Use Case Example                     |
| ----------- | ------------------------------------ |
| `"respond"` | Accepting/rejecting a request        |
| `"invite"`  | Sending an invite                    |
| `"assign"`  | Assigning users to a role or group   |
| `"approve"` | Moderating or approving content      |
| `"share"`   | Sharing a project/resource           |
| `"upload"`  | File/image/media uploads             |
| `"reorder"` | Changing position/order of items     |
| `"toggle"`  | Enabling/disabling a setting or flag |

 */
export type KnownOperation =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "respond"
  | "invite"
  | "approve"
  | "assign"
  | "share"
  | "upload"
  | "reorder"
  | "toggle";

export type OperationType = KnownOperation | (string & {});
export interface MessageExtras {
  resource?: string; // e.g. "room", "project", "profile"
  desc?: string; // developer/debugging description
  operation?: OperationType;
  [key: string]: unknown; // allow extending with any extra data
}
