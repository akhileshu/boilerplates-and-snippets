// example code - my profiel - profile of logged in user
/*
import { withFetchStatus } from "@/lib/rendering/withFetchStatus";
import { getServerUser } from "@/server/auth/getServerUser";
import { UserProfile } from "@/services/profile/components/renderers/user-profile";
import { getProfileById } from "@/services/profile/queries/getProfileById";

export default async function Page() {
  const serverUser = await getServerUser();
  if (!serverUser)
    return <p className="p-4 text-center">You are not logged in</p>;
  return withFetchStatus({
    fetchFn: () => getProfileById(serverUser.id),
    renderFn: (user) => (
      <div>
        <UserProfile user={user} isCurrentUser />
      </div>
    ),
    cardTitle: "My Profile",
  });
}
  */


function page() {
  return <div>your profile details</div>;
}

export default page;