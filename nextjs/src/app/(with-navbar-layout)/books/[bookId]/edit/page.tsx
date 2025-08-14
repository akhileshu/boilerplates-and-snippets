// example code - seller edits a book details
/*
import { ConfirmDeleteDialog } from "@/components/app/form-and-inputs/ConfirmDeleteDialog";
import { withFetchStatus } from "@/lib/rendering/withFetchStatus";

import { requireAuth } from "@/server/auth/requireAuth";
import { deleteRoom } from "@/services/realtime-rooms/actions/delete-room";
import { EditRoomForm } from "@/services/realtime-rooms/components/forms/edit-room";
import { SyncAttendeesButton } from "@/services/realtime-rooms/components/forms/sync-attendees-button";
import { getRoomById } from "@/services/realtime-rooms/queries/getRoomById";

type Params = Promise<{ roomId: string }>;

export default async function page({ params }: { params: Params }) {
  const { roomId } = await params;

  return withFetchStatus({
    fetchFn: () => getRoomById(roomId),
    beforeRender: async (room) => {
      return await requireAuth({
        authorize: (session) => room.createdById === session.user.id,
        onFailure: {
          type: "not-room-owner",
          data: { room },
          action: "edit room details",
        },
      });
    },
    renderFn: (room) => (
      <div>
        <SyncAttendeesButton roomId={roomId} />
        <ConfirmDeleteDialog
          item={{
            id: room.id,
            name: room.name,
            type: "room",
          }}
          action={{
            fn: deleteRoom,
            redirectTo: "/groups",
          }}
          dialogOptions={{
            description:
              "This action cannot be undone. All messages and room data will be permanently deleted.",
          }}
          className="my-2"
        />

        <EditRoomForm room={room} />
      </div>
    ),
    cardTitle: "Manage Room",
  });
}

*/

function page() {
  return <div>edit a particular book</div>;
}

export default page;