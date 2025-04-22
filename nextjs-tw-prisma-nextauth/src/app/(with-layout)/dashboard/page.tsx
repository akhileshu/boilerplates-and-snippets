import { getBookmarkedPosts } from "@/features/post/actions/postActions";
import MyBookmarks from "./_components/my-bookmarks";
import { MyPosts } from "./_components/my-posts";
import { MyProfile } from "./_components/my-profile";
import NotLoggedIn from "./_components/not-logged-in";

export default async function Page() {
  const notLoggedIn=await NotLoggedIn()
  if(notLoggedIn)return notLoggedIn
  const bookmarkedPostsResult = await getBookmarkedPosts();
  return (
    <main className="">
      <MyProfile />
      <MyPosts />
      <MyBookmarks bookmarkedPostsResult={bookmarkedPostsResult} />
    </main>
  );
}
