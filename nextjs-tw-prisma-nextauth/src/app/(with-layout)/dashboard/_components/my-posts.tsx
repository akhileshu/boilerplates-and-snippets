import { AppCard } from "@/components/app/card";
import { AppLink } from "@/components/app/link";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLoggedInUsersPosts } from "@/features/post/actions/postActions";
import DeletePostForm from "@/features/post/components/forms/DeletePostButton";
import { cn, formatDate } from "@/lib/utils";

export async function MyPosts({ className }: { className?: string }) {
  const postsResult = await getLoggedInUsersPosts();
  const cardTitle = "My Posts";
  const statusMessage = renderStatusMessage(postsResult, cardTitle);
  if (statusMessage || !postsResult.ok) return statusMessage;
  const { data: posts } = postsResult;

  return (
    <AppCard title={cardTitle} className={cn("", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">
                <AppLink disableTransition href={`/posts/${post.slug}`}>
                  {post.title}
                </AppLink>
              </TableCell>
              <TableCell>{formatDate(post.createdAt)}</TableCell>
              <TableCell className="text-right flex gap-3 justify-end">
                <AppLink href={`/posts/${post.slug}/edit`}>Edit</AppLink>
                <DeletePostForm postId={post.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppCard>
  );
}
