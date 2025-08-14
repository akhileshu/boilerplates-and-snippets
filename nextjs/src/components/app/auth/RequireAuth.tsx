"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type RequireAuthProps = {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
  authorize?: (session: any) => boolean | Promise<boolean>;
};

/**
 * 
### ✅ Usage in client component

```tsx
<RequireAuth
  authorize={(session) => session.user.role === 'admin'}
  fallback={<div>Only admins allowed</div>}
/>
```

Or async:

```tsx
<RequireAuth
  authorize={async (session) => {
    const res = await fetch(`/api/rooms/${roomId}`)
    const room = await res.json()
    return room.creatorId === session.user.id
  }}
  redirectTo="/unauthorized"
/>
```
 */
export default function RequireAuth({
  children,
  redirectTo,
  fallback,
  authorize,
}: RequireAuthProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      if (redirectTo) router.replace(redirectTo);
    } else if (status === "authenticated") {
      if (!authorize) {
        setAuthorized(true);
      } else {
        Promise.resolve(authorize(session)).then((result) => {
          if (!result) {
            if (redirectTo) router.replace(redirectTo);
          } else {
            setAuthorized(true);
          }
        });
      }
    }
  }, [status, session, authorize, redirectTo, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated")
    return redirectTo ? null : fallback ?? <div>Login required</div>;
  if (authorize && !authorized)
    return redirectTo ? null : fallback ?? <div>Not authorized</div>;

  return <>{children}</>;
}
