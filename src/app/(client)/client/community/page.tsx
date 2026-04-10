import { createClient } from "@/lib/supabase/server";
import { CommunityContent } from "./community-content";

export default async function CommunityPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("community_posts")
    .select(`
      *,
      author:profiles!community_posts_author_id_fkey(full_name, avatar_url),
      community_comments(count),
      community_likes(count)
    `)
    .order("created_at", { ascending: false })
    .limit(30);

  return <CommunityContent posts={posts ?? []} userId={user?.id ?? "preview"} />;
}
