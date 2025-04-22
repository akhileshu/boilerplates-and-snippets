"use client";
import { AppCard } from "@/components/app/card";
import { AppLink } from "@/components/app/link";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import { getBookmarkedPosts } from "@/features/post/actions/postActions";
import ToggleBookmarkForm from "@/features/post/components/forms/BookmarkButton";
import { cn, previewText } from "@/lib/utils";
import { CopyPostLinkButton } from "../../../../features/post/components/copy-post-link-btn";

type MyBookmarksProps = {
  bookmarkedPostsResult: Awaited<ReturnType<typeof getBookmarkedPosts>>;
  className?: string;
};

export default function MyBookmarks({
  bookmarkedPostsResult,
  className,
}: MyBookmarksProps) {
  const cardTitle = "My Bookmarks";

  const statusMessage = renderStatusMessage(bookmarkedPostsResult, cardTitle);
  if (statusMessage || !bookmarkedPostsResult.ok) return statusMessage;

  const { data } = bookmarkedPostsResult;

  return (
    <AppCard title={cardTitle} className={cn("", className)}>
      <div className="divide-y">
        {data.map((bookmark) => (
          <div
            key={bookmark.id}
            className="py-3 px-2 flex justify-between items-center hover:bg-muted/50 transition"
          >
            <div className="overflow-hidden">
              <h2 className="text-base font-medium">
                <AppLink
                  className="after:transition-none"
                  href={`/posts/${bookmark.post.slug}`}
                >
                  {bookmark.post.title}
                </AppLink>
              </h2>
              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                {previewText(bookmark.post.content, 50)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CopyPostLinkButton slug={bookmark.post.slug} />
              <ToggleBookmarkForm postId={bookmark.post.id} />
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
