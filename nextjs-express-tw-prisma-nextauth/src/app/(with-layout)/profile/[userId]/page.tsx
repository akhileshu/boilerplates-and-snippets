import { getProfileById } from "@/features/profile/actions/profileActions";
import { UserProfile } from "@/features/profile/components/viewProfile";

type Params = Promise<{ userId: string }>;
export default async function Page({
  params,
}: {
  params: Params;
}) {
  const { userId } = await params;
  const isConnected = true;
  if (!isConnected) {
    return <p>You must be connected with this user to view their profile.</p>;
  }

  const requestsResult = await getProfileById(userId);
  return <UserProfile profileResult={requestsResult}/>
}
