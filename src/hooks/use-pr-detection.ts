"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/types/database";

export function usePRDetection(clientId: string) {
  const [latestPR, setLatestPR] = useState<Tables<"personal_records"> | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`prs:${clientId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "personal_records",
          filter: `client_id=eq.${clientId}`,
        },
        (payload) => {
          const pr = payload.new as Tables<"personal_records">;
          setLatestPR(pr);
          setShowCelebration(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId]);

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
  }, []);

  return { latestPR, showCelebration, dismissCelebration };
}
