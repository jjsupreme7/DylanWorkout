export type UserRole = "client" | "coach" | "admin";
export type ApplicationStatus = "pending" | "approved" | "rejected";
export type CheckinStatus = "pending" | "reviewed";
export type SessionStatus = "in_progress" | "completed" | "skipped";
export type SubscriptionStatus = "active" | "past_due" | "canceled" | "trialing";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          full_name: string;
          email: string;
          avatar_url: string | null;
          phone: string | null;
          date_of_birth: string | null;
          gender: string | null;
          bio: string | null;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          full_name: string;
          email: string;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          bio?: string | null;
          timezone?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          bio?: string | null;
          timezone?: string;
        };
        Relationships: [];
      };
      coach_profiles: {
        Row: {
          id: string;
          specialties: string[] | null;
          certifications: string[] | null;
          max_clients: number;
          onboarding_form_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          specialties?: string[] | null;
          certifications?: string[] | null;
          max_clients?: number;
          onboarding_form_url?: string | null;
        };
        Update: {
          id?: string;
          specialties?: string[] | null;
          certifications?: string[] | null;
          max_clients?: number;
          onboarding_form_url?: string | null;
        };
        Relationships: [];
      };
      coach_clients: {
        Row: {
          id: string;
          coach_id: string;
          client_id: string;
          assigned_at: string;
          status: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          coach_id: string;
          client_id: string;
          status?: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          coach_id?: string;
          client_id?: string;
          status?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
      applications: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          goals: string | null;
          experience: string | null;
          injuries: string | null;
          dietary_restrictions: string | null;
          how_found_us: string | null;
          status: ApplicationStatus;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          goals?: string | null;
          experience?: string | null;
          injuries?: string | null;
          dietary_restrictions?: string | null;
          how_found_us?: string | null;
          status?: ApplicationStatus;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          goals?: string | null;
          experience?: string | null;
          injuries?: string | null;
          dietary_restrictions?: string | null;
          how_found_us?: string | null;
          status?: ApplicationStatus;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
        };
        Relationships: [];
      };
      programs: {
        Row: {
          id: string;
          coach_id: string;
          name: string;
          description: string | null;
          duration_weeks: number | null;
          difficulty: string | null;
          is_template: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          coach_id: string;
          name: string;
          description?: string | null;
          duration_weeks?: number | null;
          difficulty?: string | null;
          is_template?: boolean;
        };
        Update: {
          id?: string;
          coach_id?: string;
          name?: string;
          description?: string | null;
          duration_weeks?: number | null;
          difficulty?: string | null;
          is_template?: boolean;
        };
        Relationships: [];
      };
      client_programs: {
        Row: {
          id: string;
          client_id: string;
          program_id: string;
          start_date: string;
          end_date: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          program_id: string;
          start_date: string;
          end_date?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          client_id?: string;
          program_id?: string;
          start_date?: string;
          end_date?: string | null;
          is_active?: boolean;
        };
        Relationships: [];
      };
      program_days: {
        Row: {
          id: string;
          program_id: string;
          day_number: number;
          name: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          program_id: string;
          day_number: number;
          name: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          program_id?: string;
          day_number?: number;
          name?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          id: string;
          name: string;
          muscle_group: string | null;
          equipment: string | null;
          instructions: string | null;
          video_url: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          muscle_group?: string | null;
          equipment?: string | null;
          instructions?: string | null;
          video_url?: string | null;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          muscle_group?: string | null;
          equipment?: string | null;
          instructions?: string | null;
          video_url?: string | null;
          created_by?: string | null;
        };
        Relationships: [];
      };
      program_exercises: {
        Row: {
          id: string;
          program_day_id: string;
          exercise_id: string;
          order_index: number;
          sets: number | null;
          reps: string | null;
          rest_seconds: number | null;
          tempo: string | null;
          rpe: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          program_day_id: string;
          exercise_id: string;
          order_index: number;
          sets?: number | null;
          reps?: string | null;
          rest_seconds?: number | null;
          tempo?: string | null;
          rpe?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          program_day_id?: string;
          exercise_id?: string;
          order_index?: number;
          sets?: number | null;
          reps?: string | null;
          rest_seconds?: number | null;
          tempo?: string | null;
          rpe?: number | null;
          notes?: string | null;
        };
        Relationships: [];
      };
      workout_sessions: {
        Row: {
          id: string;
          client_id: string;
          program_day_id: string | null;
          status: SessionStatus;
          started_at: string;
          completed_at: string | null;
          duration_minutes: number | null;
          notes: string | null;
          rating: number | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          program_day_id?: string | null;
          status?: SessionStatus;
          notes?: string | null;
          rating?: number | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          program_day_id?: string | null;
          status?: SessionStatus;
          started_at?: string;
          completed_at?: string | null;
          duration_minutes?: number | null;
          notes?: string | null;
          rating?: number | null;
        };
        Relationships: [];
      };
      exercise_logs: {
        Row: {
          id: string;
          session_id: string;
          exercise_id: string;
          set_number: number;
          reps: number | null;
          weight: number | null;
          weight_unit: string;
          rpe: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          exercise_id: string;
          set_number: number;
          reps?: number | null;
          weight?: number | null;
          weight_unit?: string;
          rpe?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          session_id?: string;
          exercise_id?: string;
          set_number?: number;
          reps?: number | null;
          weight?: number | null;
          weight_unit?: string;
          rpe?: number | null;
          notes?: string | null;
        };
        Relationships: [];
      };
      food_logs: {
        Row: {
          id: string;
          client_id: string;
          meal_type: string | null;
          food_name: string;
          calories: number | null;
          protein: number | null;
          carbs: number | null;
          fat: number | null;
          fiber: number | null;
          serving_size: string | null;
          image_url: string | null;
          ai_detected: boolean;
          logged_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          meal_type?: string | null;
          food_name: string;
          calories?: number | null;
          protein?: number | null;
          carbs?: number | null;
          fat?: number | null;
          fiber?: number | null;
          serving_size?: string | null;
          image_url?: string | null;
          ai_detected?: boolean;
        };
        Update: {
          id?: string;
          client_id?: string;
          meal_type?: string | null;
          food_name?: string;
          calories?: number | null;
          protein?: number | null;
          carbs?: number | null;
          fat?: number | null;
          fiber?: number | null;
          serving_size?: string | null;
          image_url?: string | null;
          ai_detected?: boolean;
        };
        Relationships: [];
      };
      nutrition_targets: {
        Row: {
          id: string;
          client_id: string;
          calories: number | null;
          protein: number | null;
          carbs: number | null;
          fat: number | null;
          fiber: number | null;
          water_oz: number | null;
          set_by: string | null;
          effective_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          calories?: number | null;
          protein?: number | null;
          carbs?: number | null;
          fat?: number | null;
          fiber?: number | null;
          water_oz?: number | null;
          set_by?: string | null;
          effective_date: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          calories?: number | null;
          protein?: number | null;
          carbs?: number | null;
          fat?: number | null;
          fiber?: number | null;
          water_oz?: number | null;
          set_by?: string | null;
          effective_date?: string;
        };
        Relationships: [];
      };
      checkins: {
        Row: {
          id: string;
          client_id: string;
          coach_id: string | null;
          weight: number | null;
          weight_unit: string;
          sleep_hours: number | null;
          stress_level: number | null;
          energy_level: number | null;
          adherence_training: number | null;
          adherence_nutrition: number | null;
          wins: string | null;
          struggles: string | null;
          questions: string | null;
          coach_feedback: string | null;
          status: CheckinStatus;
          submitted_at: string;
          reviewed_at: string | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          coach_id?: string | null;
          weight?: number | null;
          weight_unit?: string;
          sleep_hours?: number | null;
          stress_level?: number | null;
          energy_level?: number | null;
          adherence_training?: number | null;
          adherence_nutrition?: number | null;
          wins?: string | null;
          struggles?: string | null;
          questions?: string | null;
          status?: CheckinStatus;
        };
        Update: {
          id?: string;
          client_id?: string;
          coach_id?: string | null;
          weight?: number | null;
          weight_unit?: string;
          sleep_hours?: number | null;
          stress_level?: number | null;
          energy_level?: number | null;
          adherence_training?: number | null;
          adherence_nutrition?: number | null;
          wins?: string | null;
          struggles?: string | null;
          questions?: string | null;
          coach_feedback?: string | null;
          status?: CheckinStatus;
          reviewed_at?: string | null;
        };
        Relationships: [];
      };
      checkin_photos: {
        Row: {
          id: string;
          checkin_id: string;
          photo_url: string;
          photo_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          checkin_id: string;
          photo_url: string;
          photo_type?: string | null;
        };
        Update: {
          id?: string;
          checkin_id?: string;
          photo_url?: string;
          photo_type?: string | null;
        };
        Relationships: [];
      };
      personal_records: {
        Row: {
          id: string;
          client_id: string;
          exercise_id: string;
          weight: number | null;
          weight_unit: string;
          reps: number | null;
          achieved_at: string;
          previous_record: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          exercise_id: string;
          weight?: number | null;
          weight_unit?: string;
          reps?: number | null;
          previous_record?: number | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          exercise_id?: string;
          weight?: number | null;
          weight_unit?: string;
          reps?: number | null;
          previous_record?: number | null;
        };
        Relationships: [];
      };
      body_measurements: {
        Row: {
          id: string;
          client_id: string;
          weight: number | null;
          body_fat_pct: number | null;
          chest: number | null;
          waist: number | null;
          hips: number | null;
          bicep: number | null;
          thigh: number | null;
          measured_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          weight?: number | null;
          body_fat_pct?: number | null;
          chest?: number | null;
          waist?: number | null;
          hips?: number | null;
          bicep?: number | null;
          thigh?: number | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          weight?: number | null;
          body_fat_pct?: number | null;
          chest?: number | null;
          waist?: number | null;
          hips?: number | null;
          bicep?: number | null;
          thigh?: number | null;
        };
        Relationships: [];
      };
      community_posts: {
        Row: {
          id: string;
          author_id: string;
          content: string;
          post_type: string;
          media_url: string | null;
          pinned: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          content: string;
          post_type?: string;
          media_url?: string | null;
          pinned?: boolean;
        };
        Update: {
          id?: string;
          author_id?: string;
          content?: string;
          post_type?: string;
          media_url?: string | null;
          pinned?: boolean;
        };
        Relationships: [];
      };
      community_comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          content: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          content?: string;
        };
        Relationships: [];
      };
      community_likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          client_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          plan_name: string | null;
          status: SubscriptionStatus;
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan_name?: string | null;
          status?: SubscriptionStatus;
          current_period_start?: string | null;
          current_period_end?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan_name?: string | null;
          status?: SubscriptionStatus;
          current_period_start?: string | null;
          current_period_end?: string | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          body: string | null;
          type: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          body?: string | null;
          type?: string | null;
          read?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          body?: string | null;
          type?: string | null;
          read?: boolean;
        };
        Relationships: [];
      };
      streaks: {
        Row: {
          id: string;
          client_id: string;
          streak_type: string;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          streak_type: string;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          streak_type?: string;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      application_status: ApplicationStatus;
      checkin_status: CheckinStatus;
      session_status: SessionStatus;
      subscription_status: SubscriptionStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

// Convenience type aliases
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
