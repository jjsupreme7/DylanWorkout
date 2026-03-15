"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import { Megaphone, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function BroadcastPage() {
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSend(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("community_posts").insert({
      author_id: user.id,
      content: formData.get("content") as string,
      post_type: formData.get("post_type") as string || "general",
      pinned: true,
    });

    if (!error) {
      toast.success("Broadcast sent!");
      setSent(true);
    } else {
      toast.error("Failed to send broadcast");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Broadcast</h1>
      <p className="text-sm text-text-secondary">Send a message to all your clients via the community feed.</p>

      {sent ? (
        <Card className="p-6">
          <EmptyState
            icon={Megaphone}
            title="Broadcast Sent!"
            description="Your message has been posted to the community feed."
            actionLabel="Send Another"
            onAction={() => setSent(false)}
          />
        </Card>
      ) : (
        <Card className="p-5">
          <form action={handleSend} className="space-y-4">
            <Select
              name="post_type"
              label="Post Type"
              options={[
                { value: "general", label: "General Announcement" },
                { value: "win", label: "Celebration" },
                { value: "video", label: "Video/Replay" },
              ]}
            />
            <Textarea
              name="content"
              label="Message"
              placeholder="Write your message to all clients..."
              rows={6}
              required
            />
            <Button type="submit" loading={saving} size="lg" className="w-full">
              <Send className="h-4 w-4" />
              Send Broadcast
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
