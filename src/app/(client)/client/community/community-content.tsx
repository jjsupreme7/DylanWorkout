"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Plus, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatRelative } from "@/lib/utils/format";
import { toast } from "sonner";

const tabs = [
  { id: "feed", label: "Feed" },
  { id: "questions", label: "Q&A" },
  { id: "wins", label: "Wins" },
];

interface Post {
  id: string;
  content: string;
  post_type: string;
  media_url: string | null;
  pinned: boolean;
  created_at: string;
  author: { full_name: string; avatar_url: string | null } | null;
  community_comments: { count: number }[];
  community_likes: { count: number }[];
}

interface CommunityContentProps {
  posts: Post[];
  userId: string;
}

export function CommunityContent({ posts: initialPosts, userId }: CommunityContentProps) {
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState(initialPosts);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const filtered = activeTab === "feed"
    ? posts
    : posts.filter((p) => p.post_type === (activeTab === "questions" ? "question" : "win"));

  async function handleNewPost(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("community_posts")
      .insert({
        author_id: userId,
        content: formData.get("content") as string,
        post_type: formData.get("post_type") as string || "general",
      })
      .select(`
        *,
        author:profiles!community_posts_author_id_fkey(full_name, avatar_url),
        community_comments(count),
        community_likes(count)
      `)
      .single();

    if (data && !error) {
      setPosts((prev) => [data as Post, ...prev]);
      setShowNew(false);
      toast.success("Posted!");
    }
    setSaving(false);
  }

  async function handleLike(postId: string) {
    const supabase = createClient();
    await supabase.from("community_likes").insert({ post_id: postId, user_id: userId });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <Button size="sm" onClick={() => setShowNew(true)}>
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((post) => (
            <Card key={post.id} className="p-4">
              <div className="flex items-start gap-3">
                <Avatar
                  src={post.author?.avatar_url}
                  name={post.author?.full_name ?? "User"}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{post.author?.full_name}</p>
                    <span className="text-xs text-text-muted">{formatRelative(post.created_at)}</span>
                    {post.post_type !== "general" && (
                      <Badge variant={post.post_type === "win" ? "success" : "attention"}>
                        {post.post_type}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-text-secondary whitespace-pre-wrap">{post.content}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1 text-xs text-text-muted hover:text-brand transition-colors"
                    >
                      <Heart className="h-3.5 w-3.5" />
                      {post.community_likes?.[0]?.count ?? 0}
                    </button>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {post.community_comments?.[0]?.count ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No posts yet"
          description="Be the first to share something with the community!"
          actionLabel="New Post"
          onAction={() => setShowNew(true)}
        />
      )}

      <Modal open={showNew} onClose={() => setShowNew(false)} title="New Post">
        <form action={handleNewPost} className="space-y-3">
          <Textarea name="content" placeholder="What's on your mind?" rows={4} required />
          <div className="flex gap-2">
            {["general", "question", "win"].map((type) => (
              <label key={type} className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input type="radio" name="post_type" value={type} defaultChecked={type === "general"} />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
          <Button type="submit" loading={saving} className="w-full">
            Post
          </Button>
        </form>
      </Modal>
    </div>
  );
}
