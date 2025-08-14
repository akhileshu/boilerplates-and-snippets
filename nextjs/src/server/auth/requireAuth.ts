// lib/requireAuth.ts
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";
import { authFailures, AuthFailureType, WithRoom } from "./failureReasons";

type AuthCheckFn = (session: Session) => boolean | Promise<boolean>;

/**
 * better to use this when you require authorization
 * @example
 * "use server"
 * export default async function ManageRoomPage({ params }: { params: { id: string } }) {
  const session = await requireAuth({
    redirectTo: '/unauthorized',
    authorize: async (session) => {
      const room = await getRoomById(params.id)
      return room?.creatorId === session.user.id
    },
  })

  return <div>Manage Room {params.id}</div>
}
 */
export async function requireAuth(options: {
  authorize?: AuthCheckFn;
  onFailure?: {
    type: AuthFailureType;
    data?: WithRoom; // used by contextBuilder
    action?: string; // dynamic, page-specific
  };
}): Promise<Session> {
  const session = await getServerSession(authOptions);

  const isAuthorized =
    !!session?.user?.id &&
    (!options?.authorize || (await options.authorize(session)));

  if (!isAuthorized) {
    const failure = options.onFailure
      ? authFailures[options.onFailure.type]
      : authFailures["not-admin"]; // fallback type

    const context = failure.buildContext?.(options.onFailure?.data || {});
    const action = options.onFailure?.action;

    const params = new URLSearchParams({
      code: failure.code,
      ...(action ? { action } : {}),
      ...(context || {}),
    }).toString();

    redirect(`${failure.redirectTo}?${params}`);
  }

  return session;
}
