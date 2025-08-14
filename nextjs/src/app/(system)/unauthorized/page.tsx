"use client";

import { authFailures } from "@/server/auth/failureReasons";
import { useSearchParams } from "next/navigation";

/**
 * 
 * @example 
 * Room Access Denied
 * 
You are not the creator of "Weekly Code Review".

You were trying to: edit room details

Go Back
 */
export default function UnauthorizedPage() {
  const params = useSearchParams();
  const code = params.get("code"); // e.g. "not-room-owner"
  const action = params.get("action");

  const failure =
    code && code in authFailures
      ? authFailures[code as keyof typeof authFailures]
      : null;

  if (!failure) {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{failure.title}</h2>
      <p>{failure.message(params)}</p>

      {action && (
        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
          You were trying to: {action}
        </p>
      )}

      <button
        onClick={() => window.history.back()}
        style={{ marginTop: "1rem" }}
      >
        Go Back
      </button>
    </div>
  );
}
