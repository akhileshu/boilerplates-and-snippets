// app/rooms/[roomId]/manage/page.tsx

import { ConfirmDeleteDialog } from "@/components/app/form-and-inputs/ConfirmDeleteDialog";
import { withFetchStatus } from "@/lib/rendering";

import { requireAuth } from "@/server/auth/requireAuth";
import { roomService } from "@/services/realtime-rooms";

type Params = Promise<{ roomId: string }>;

export default async function page({ params }: { params: Params }) {
  const { roomId } = await params;

  return withFetchStatus({
    fetchFn: () => roomService.queries.getRoomById(roomId),
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
        <roomService.Forms.SyncAttendeesButton roomId={roomId} />
        <ConfirmDeleteDialog
          item={{
            id: room.id,
            name: room.name,
            type: "room",
          }}
          action={{
            fn: roomService.actions.deleteRoom,
            redirectTo: "/groups",
          }}
          dialogOptions={{
            description:
              "This action cannot be undone. All messages and room data will be permanently deleted.",
          }}
          className="my-2"
        />

        <roomService.Forms.EditRoomForm room={room} />
      </div>
    ),
    cardTitle: "Manage Room",
  });
}

