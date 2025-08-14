// example code - to display details of a particular book
/*
import { withFetchStatus } from "@/lib/rendering/withFetchStatus";
import { GroupDetailsCard } from "@/services/groups/components/renderers/group-details";
import { getGroupById } from "@/services/groups/queries/getGroupById";

type Params = Promise<{ groupId: string }>;

export default async function page({ params }: { params: Params }) {
  const { groupId } = await params;

  return withFetchStatus({
    fetchFn: () => getGroupById(groupId),
    renderFn: (group) => (
      <GroupDetailsCard group={group} />
    ),
    cardTitle: "Groups",
  });
}

*/

function page() {
  return <div>details of a particular book</div>;
}

export default page;