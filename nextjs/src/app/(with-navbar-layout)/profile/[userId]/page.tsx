// example code to display details of a particular user
/*
import { withFetchStatus } from "@/lib/rendering/withFetchStatus";
import { ConnectionStatus } from "@/services/connections/components/renderers/connection-status";
import { UserProfile } from "@/services/profile/components/renderers/user-profile";
import { getProfileById } from "@/services/profile/queries/getProfileById";


type Params = Promise<{ userId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { userId } = await params;

  return withFetchStatus({
    fetchFn: () => getProfileById(userId),
    renderFn: (user) => (
      <div className="p-12 space-y-4 flex justify-start ">
        <UserProfile
          className=" max-w-lg"
          user={user}
          isCurrentUser={false}
        />
        <ConnectionStatus
          className=" max-w-lg"
          targetUser={user}
        />
      </div>
    ),
    cardTitle: "user profile's",
  });
}

*/

function page() {
  return <div>profile details of a user</div>;
}

export default page;