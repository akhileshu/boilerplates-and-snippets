import { useSession } from "next-auth/react";

export function useAuthStatus() {
  const { data: session, status } = useSession();

  const shouldForceLogin =
    !session?.user?.id ||
    session?.error === "TokenExpired" ||
    session?.error === "RefreshTokenError";

  return {
    session,
    status,
    shouldForceLogin,
    enableFirebaseBridge: !shouldForceLogin,
    enablePresenceTracking: !shouldForceLogin,
  };
}