// example page for rendering a list of items(books)
/*
import { SearchParams } from "@/lib/rendering/types";
import { withFetchStatus } from "@/lib/rendering/withFetchStatus";
import { UserProfilesOverview } from "@/services/profile/components/renderers/UserProfilesOverview";
import { getAllProfiles } from "@/services/profile/queries/getAllProfiles";
import { userProfileFilterConfig } from "@/services/profile/utils/user-profile-filter-config";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return withFetchStatus({
    searchParams,
    filterConfig: userProfileFilterConfig,
    fetchFn: (filters) => getAllProfiles(filters!),
    renderFn: (profiles) => (
      <div>
        <UserProfilesOverview users={profiles} />
      </div>
    ),
    cardTitle: "user profile's",
  });
}

*/

function page() {
  return <div>list of books</div>;
}

export default page;
