import { getLoggedInUserProfile } from "@/features/profile/actions/profileActions";
import { ViewOrEditMyProfile } from "@/features/profile/components/ViewOrEditProfile";

export default async function SetupProfile() {
  const profileResult = await getLoggedInUserProfile();
  return <ViewOrEditMyProfile profileResult={profileResult} />;
}
