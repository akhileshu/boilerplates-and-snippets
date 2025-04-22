import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import { getPostBySlug } from "@/features/post/actions/postActions";
import MdEditor from "@/features/post/components/md-editor";
import { formatDate } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postResult = await getPostBySlug(slug);
  const statusMessage = renderStatusMessage(postResult, "Post Unavailable");
  if (statusMessage || !postResult.ok) return statusMessage;
  const { data: post } = postResult;

  return (
    <AppCard title={post.title}>
      <div className="mb-4 text-sm text-muted-foreground flex gap-2">
        <p>
          By <strong>{post.author.name}</strong>
        </p>
        <p>Created on: {formatDate(post.createdAt)}</p>
        {post.updatedAt !== post.createdAt && (
          <p>Updated on: {formatDate(post.updatedAt)}</p>
        )}
      </div>

      <MdEditor postSlug={post.slug} postId={post.id} content={post.content} />
    </AppCard>
  );
}
