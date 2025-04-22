import { Button } from "@/components/app/button";
import { toast } from "sonner";

export function CopyPostLinkButton({ slug }: { slug: string }) {
  const handleShare = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Post link copied to clipboard!");
  };

  return (
    <Button disabled={false} onClick={handleShare}>
      Share
    </Button>
  );
}
