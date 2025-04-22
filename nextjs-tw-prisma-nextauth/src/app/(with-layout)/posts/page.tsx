import { AppCard } from "@/components/app/card";
import { AppLink } from "@/components/app/link";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import { getPosts } from "@/features/post/actions/postActions";
import { formatDate, previewText } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const postsResult = await getPosts(query);

  const statusMessage = renderStatusMessage(
    postsResult,
    <span className="text-xl mb-4">
      {`${0} Results for `}
      <span className="font-bold">{query}</span>
    </span>
  );
  if (statusMessage || !postsResult.ok) return statusMessage;

  const { data: posts } = postsResult;

  return (
    <AppCard
      className="p-4"
      title={
        <span className="text-xl mb-4">
          {`${posts.length} Results for `}
          <span className="font-bold">{query}</span>
        </span>
      }
    >
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded-md">
            <AppLink
              className="after:transition-none"
              href={`/posts/${post.slug}`}
            >
              <h2 className="font-semibold text-lg">{post.title}</h2>
            </AppLink>
            <p className="text-sm text-gray-600 mb-1">
              by {post.author.name ?? "Unknown"} on {formatDate(post.createdAt)}
            </p>
            <p className="text-gray-700">{previewText(post.content, 100)}</p>
          </li>
        ))}
      </ul>
    </AppCard>
  );
}
