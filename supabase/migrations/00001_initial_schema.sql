-- Enter the Dragon - Initial Database Schema
-- Fitness/Nutrition Coaching Platform

-- ============================================
-- EXTENSIONS
-- ============================================
create extension if not exists "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================
create type user_role as enum ('client', 'coach', 'admin');
create type application_status as enum ('pending', 'approved', 'rejected');
create type checkin_status as enum ('pending', 'reviewed');
create type session_status as enum ('in_progress', 'completed', 'skipped');
create type subscription_status as enum ('active', 'past_due', 'canceled', 'trialing');

-- ============================================
-- 1. USERS / PROFILES
-- ============================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'client',
  full_name text not null,
  email text not null,
  avatar_url text,
  phone text,
  date_of_birth date,
  gender text,
  bio text,
  timezone text default 'America/Los_Angeles',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Coach-specific profile info
create table coach_profiles (
  id uuid primary key references profiles(id) on delete cascade,
  specialties text[],
  certifications text[],
  max_clients integer default 50,
  onboarding_form_url text,
  created_at timestamptz default now()
);

-- Coach-client relationship
create table coach_clients (
  id uuid primary key default uuid_generate_v4(),
  coach_id uuid not null references profiles(id) on delete cascade,
  client_id uuid not null references profiles(id) on delete cascade,
  assigned_at timestamptz default now(),
  status text default 'active',
  notes text,
  unique(coach_id, client_id)
);

-- ============================================
-- 2. APPLICATIONS
-- ============================================
create table applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  goals text,
  experience text,
  injuries text,
  dietary_restrictions text,
  how_found_us text,
  status application_status default 'pending',
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================
-- 3. PROGRAMS
-- ============================================
create table programs (
  id uuid primary key default uuid_generate_v4(),
  coach_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  description text,
  duration_weeks integer,
  difficulty text, -- beginner, intermediate, advanced
  is_template boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Program assigned to a client
create table client_programs (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  program_id uuid not null references programs(id) on delete cascade,
  start_date date not null,
  end_date date,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Days within a program
create table program_days (
  id uuid primary key default uuid_generate_v4(),
  program_id uuid not null references programs(id) on delete cascade,
  day_number integer not null,
  name text not null, -- e.g., "Push Day", "Upper Body A"
  notes text,
  created_at timestamptz default now()
);

-- Exercises in the exercise library
create table exercises (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  muscle_group text,
  equipment text,
  instructions text,
  video_url text,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Prescribed exercises within a program day
create table program_exercises (
  id uuid primary key default uuid_generate_v4(),
  program_day_id uuid not null references program_days(id) on delete cascade,
  exercise_id uuid not null references exercises(id),
  order_index integer not null,
  sets integer,
  reps text, -- e.g., "8-12" or "AMRAP"
  rest_seconds integer,
  tempo text, -- e.g., "3-1-1-0"
  rpe numeric(3,1), -- rate of perceived exertion
  notes text,
  created_at timestamptz default now()
);

-- ============================================
-- 4. WORKOUT SESSIONS / LOGS
-- ============================================
create table workout_sessions (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  program_day_id uuid references program_days(id),
  status session_status default 'in_progress',
  started_at timestamptz default now(),
  completed_at timestamptz,
  duration_minutes integer,
  notes text,
  rating integer check (rating between 1 and 10)
);

create table exercise_logs (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references workout_sessions(id) on delete cascade,
  exercise_id uuid not null references exercises(id),
  set_number integer not null,
  reps integer,
  weight numeric(7,2),
  weight_unit text default 'lbs',
  rpe numeric(3,1),
  notes text,
  created_at timestamptz default now()
);

-- ============================================
-- 5. NUTRITION
-- ============================================
create table food_logs (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  meal_type text, -- breakfast, lunch, dinner, snack
  food_name text not null,
  calories integer,
  protein numeric(7,2),
  carbs numeric(7,2),
  fat numeric(7,2),
  fiber numeric(7,2),
  serving_size text,
  image_url text, -- for AI food scanning
  ai_detected boolean default false,
  logged_at timestamptz default now(),
  created_at timestamptz default now()
);

create table nutrition_targets (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  calories integer,
  protein integer,
  carbs integer,
  fat integer,
  fiber integer,
  water_oz integer,
  set_by uuid references profiles(id), -- coach who set the targets
  effective_date date not null,
  created_at timestamptz default now()
);

-- ============================================
-- 6. CHECK-INS
-- ============================================
create table checkins (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  coach_id uuid references profiles(id),
  weight numeric(5,2),
  weight_unit text default 'lbs',
  sleep_hours numeric(3,1),
  stress_level integer check (stress_level between 1 and 10),
  energy_level integer check (energy_level between 1 and 10),
  adherence_training integer check (adherence_training between 0 and 100),
  adherence_nutrition integer check (adherence_nutrition between 0 and 100),
  wins text,
  struggles text,
  questions text,
  coach_feedback text,
  status checkin_status default 'pending',
  submitted_at timestamptz default now(),
  reviewed_at timestamptz
);

create table checkin_photos (
  id uuid primary key default uuid_generate_v4(),
  checkin_id uuid not null references checkins(id) on delete cascade,
  photo_url text not null,
  photo_type text, -- front, side, back
  created_at timestamptz default now()
);

-- ============================================
-- 7. PROGRESS / PRs
-- ============================================
create table personal_records (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  exercise_id uuid not null references exercises(id),
  weight numeric(7,2),
  weight_unit text default 'lbs',
  reps integer,
  achieved_at timestamptz default now(),
  previous_record numeric(7,2),
  created_at timestamptz default now()
);

create table body_measurements (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  weight numeric(5,2),
  body_fat_pct numeric(4,1),
  chest numeric(5,2),
  waist numeric(5,2),
  hips numeric(5,2),
  bicep numeric(5,2),
  thigh numeric(5,2),
  measured_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ============================================
-- 8. COMMUNITY
-- ============================================
create table community_posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  post_type text default 'general', -- general, question, win, video
  media_url text,
  pinned boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table community_comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references community_posts(id) on delete cascade,
  author_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

create table community_likes (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references community_posts(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

-- ============================================
-- 9. SUBSCRIPTIONS
-- ============================================
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_name text,
  status subscription_status default 'trialing',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- 10. NOTIFICATIONS
-- ============================================
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  body text,
  type text, -- checkin_reminder, workout_reminder, pr_achieved, coach_feedback
  read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- 11. STREAKS
-- ============================================
create table streaks (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references profiles(id) on delete cascade,
  streak_type text not null, -- workout, nutrition, checkin
  current_streak integer default 0,
  longest_streak integer default 0,
  last_activity_date date,
  updated_at timestamptz default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_coach_clients_coach on coach_clients(coach_id);
create index idx_coach_clients_client on coach_clients(client_id);
create index idx_client_programs_client on client_programs(client_id);
create index idx_program_days_program on program_days(program_id);
create index idx_program_exercises_day on program_exercises(program_day_id);
create index idx_workout_sessions_client on workout_sessions(client_id);
create index idx_exercise_logs_session on exercise_logs(session_id);
create index idx_food_logs_client on food_logs(client_id);
create index idx_food_logs_date on food_logs(logged_at);
create index idx_checkins_client on checkins(client_id);
create index idx_personal_records_client on personal_records(client_id);
create index idx_community_posts_author on community_posts(author_id);
create index idx_notifications_user on notifications(user_id);
create index idx_notifications_unread on notifications(user_id) where read = false;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table profiles enable row level security;
alter table coach_profiles enable row level security;
alter table coach_clients enable row level security;
alter table applications enable row level security;
alter table programs enable row level security;
alter table client_programs enable row level security;
alter table program_days enable row level security;
alter table exercises enable row level security;
alter table program_exercises enable row level security;
alter table workout_sessions enable row level security;
alter table exercise_logs enable row level security;
alter table food_logs enable row level security;
alter table nutrition_targets enable row level security;
alter table checkins enable row level security;
alter table checkin_photos enable row level security;
alter table personal_records enable row level security;
alter table body_measurements enable row level security;
alter table community_posts enable row level security;
alter table community_comments enable row level security;
alter table community_likes enable row level security;
alter table subscriptions enable row level security;
alter table notifications enable row level security;
alter table streaks enable row level security;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Profiles: users can read their own, coaches can read their clients
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Coaches can view their clients"
  on profiles for select using (
    exists (
      select 1 from coach_clients
      where coach_clients.coach_id = auth.uid()
        and coach_clients.client_id = profiles.id
    )
  );

-- Coach clients: coaches see their assignments, clients see their coach
create policy "Coaches can manage their client assignments"
  on coach_clients for all using (coach_id = auth.uid());

create policy "Clients can view their coach"
  on coach_clients for select using (client_id = auth.uid());

-- Programs: coaches manage their own, clients see assigned programs
create policy "Coaches can manage their programs"
  on programs for all using (coach_id = auth.uid());

create policy "Clients can view assigned programs"
  on programs for select using (
    exists (
      select 1 from client_programs
      where client_programs.program_id = programs.id
        and client_programs.client_id = auth.uid()
    )
  );

-- Workout sessions: clients own their sessions, coaches can view
create policy "Clients own their sessions"
  on workout_sessions for all using (client_id = auth.uid());

create policy "Coaches can view client sessions"
  on workout_sessions for select using (
    exists (
      select 1 from coach_clients
      where coach_clients.coach_id = auth.uid()
        and coach_clients.client_id = workout_sessions.client_id
    )
  );

-- Food logs: clients own theirs, coaches can view
create policy "Clients own their food logs"
  on food_logs for all using (client_id = auth.uid());

create policy "Coaches can view client food logs"
  on food_logs for select using (
    exists (
      select 1 from coach_clients
      where coach_clients.coach_id = auth.uid()
        and coach_clients.client_id = food_logs.client_id
    )
  );

-- Check-ins: clients submit, coaches review
create policy "Clients own their checkins"
  on checkins for all using (client_id = auth.uid());

create policy "Coaches can view and respond to checkins"
  on checkins for all using (
    exists (
      select 1 from coach_clients
      where coach_clients.coach_id = auth.uid()
        and coach_clients.client_id = checkins.client_id
    )
  );

-- Personal records: clients own, coaches can view
create policy "Clients own their PRs"
  on personal_records for all using (client_id = auth.uid());

create policy "Coaches can view client PRs"
  on personal_records for select using (
    exists (
      select 1 from coach_clients
      where coach_clients.coach_id = auth.uid()
        and coach_clients.client_id = personal_records.client_id
    )
  );

-- Community: everyone can read, authors can manage their own posts
create policy "Anyone can view community posts"
  on community_posts for select using (true);

create policy "Authors can manage their posts"
  on community_posts for all using (author_id = auth.uid());

create policy "Anyone can view comments"
  on community_comments for select using (true);

create policy "Authors can manage their comments"
  on community_comments for all using (author_id = auth.uid());

create policy "Anyone can like posts"
  on community_likes for all using (user_id = auth.uid());

-- Notifications: users see only their own
create policy "Users see own notifications"
  on notifications for all using (user_id = auth.uid());

-- Streaks: clients see theirs, coaches can view
create policy "Clients own their streaks"
  on streaks for all using (client_id = auth.uid());

-- Exercises: everyone can read the library
create policy "Anyone can view exercises"
  on exercises for select using (true);

create policy "Coaches can manage exercises"
  on exercises for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role = 'coach'
    )
  );

-- Exercise logs: clients own theirs
create policy "Clients own their exercise logs"
  on exercise_logs for all using (
    exists (
      select 1 from workout_sessions
      where workout_sessions.id = exercise_logs.session_id
        and workout_sessions.client_id = auth.uid()
    )
  );

-- Subscriptions: clients see their own
create policy "Clients see own subscription"
  on subscriptions for select using (client_id = auth.uid());

-- Applications: public insert, coaches/admins can view
create policy "Anyone can submit an application"
  on applications for insert with check (true);

create policy "Coaches can view applications"
  on applications for select using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role in ('coach', 'admin')
    )
  );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

create trigger programs_updated_at
  before update on programs
  for each row execute function update_updated_at();

create trigger community_posts_updated_at
  before update on community_posts
  for each row execute function update_updated_at();

create trigger subscriptions_updated_at
  before update on subscriptions
  for each row execute function update_updated_at();

-- Auto-detect personal records on exercise log insert
create or replace function check_personal_record()
returns trigger as $$
declare
  current_max numeric;
begin
  select max(weight) into current_max
  from exercise_logs el
  join workout_sessions ws on ws.id = el.session_id
  where ws.client_id = (select client_id from workout_sessions where id = new.session_id)
    and el.exercise_id = new.exercise_id
    and el.id != new.id;

  if new.weight > coalesce(current_max, 0) then
    insert into personal_records (client_id, exercise_id, weight, reps, previous_record)
    values (
      (select client_id from workout_sessions where id = new.session_id),
      new.exercise_id,
      new.weight,
      new.reps,
      current_max
    );
  end if;

  return new;
end;
$$ language plpgsql;

create trigger check_pr_on_log
  after insert on exercise_logs
  for each row execute function check_personal_record();
