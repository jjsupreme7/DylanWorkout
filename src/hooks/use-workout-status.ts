"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface WorkoutStatus {
  sessionId: string;
  status: string;
  startedAt: string;
}

export function useWorkoutStatus(clientId: string) {
  const [workoutStatus, setWorkoutStatus] = useState<WorkoutStatus | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Check for active session
    supabase
      .from("workout_sessions")
      .select("id, status, started_at")
      .eq("client_id", clientId)
      .eq("status", "in_progress")
      .order("started_at", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setWorkoutStatus({
            sessionId: data.id,
            status: data.status,
            startedAt: data.started_at,
          });
        }
      });

    // Real-time updates
    const channel = supabase
      .channel(`workout:${clientId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workout_sessions",
          filter: `client_id=eq.${clientId}`,
        },
        (payload) => {
          const session = payload.new as any;
          if (session.status === "in_progress") {
            setWorkoutStatus({
              sessionId: session.id,
              status: session.status,
              startedAt: session.started_at,
            });
          } else {
            setWorkoutStatus(null);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId]);

  return workoutStatus;
}
