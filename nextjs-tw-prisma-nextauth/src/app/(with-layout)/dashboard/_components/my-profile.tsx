import { AppCard } from "@/components/app/card";
import { StatusMessage } from "@/components/app/info";
import { getServerUser } from "@/lib/auth/lib";
import { getMessage } from "@/features/message/lib/get-message";
import { cn } from "@/lib/utils";

export async function MyProfile({ className }: { className?: string }) {
  const user = await getServerUser();
  const cardTitle = "My Profile";
  if (!user)
    return (
      <StatusMessage
        cardTitle={cardTitle}
        message={getMessage("auth", "NOT_LOGGED_IN")}
      />
    );

  return (
    <AppCard title={cardTitle} className={cn("", className)}>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </AppCard>
  );
}
