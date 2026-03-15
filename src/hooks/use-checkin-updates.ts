"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useCheckinUpdates(coachId: string) {
  const [newCheckinCount, setNewCheckinCount] = useState(0);

  useEffect(() => {
    const supabase = createClient();

    // Subscribe to new checkins from coach's clients
    const channel = supabase
      .channel(`checkins:coach:${coachId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "checkins",
        },
        () => {
          setNewCheckinCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [coachId]);

  function resetCount() {
    setNewCheckinCount(0);
  }

  return { newCheckinCount, resetCount };
}
