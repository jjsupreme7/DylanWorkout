-- Fix missing INSERT policies that block signup and data creation

-- Profiles: allow users to insert their own profile on signup
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Coach profiles: allow coaches to insert their own coach profile
CREATE POLICY "Coaches can insert own coach profile"
  ON coach_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Client programs: clients can view their assignments
CREATE POLICY "Clients can view their programs"
  ON client_programs FOR SELECT USING (client_id = auth.uid());

-- Coaches can manage client program assignments
CREATE POLICY "Coaches can manage client programs"
  ON client_programs FOR ALL USING (
    EXISTS (
      SELECT 1 FROM programs
      WHERE programs.id = client_programs.program_id
        AND programs.coach_id = auth.uid()
    )
  );

-- Program days: viewable by anyone who can see the program
CREATE POLICY "Users can view program days"
  ON program_days FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM programs WHERE programs.id = program_days.program_id
        AND (programs.coach_id = auth.uid()
          OR EXISTS (
            SELECT 1 FROM client_programs
            WHERE client_programs.program_id = programs.id
              AND client_programs.client_id = auth.uid()
          ))
    )
  );

-- Coaches can manage program days
CREATE POLICY "Coaches can manage program days"
  ON program_days FOR ALL USING (
    EXISTS (
      SELECT 1 FROM programs
      WHERE programs.id = program_days.program_id
        AND programs.coach_id = auth.uid()
    )
  );

-- Program exercises: viewable by anyone who can see the program
CREATE POLICY "Users can view program exercises"
  ON program_exercises FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM program_days
      JOIN programs ON programs.id = program_days.program_id
      WHERE program_days.id = program_exercises.program_day_id
        AND (programs.coach_id = auth.uid()
          OR EXISTS (
            SELECT 1 FROM client_programs
            WHERE client_programs.program_id = programs.id
              AND client_programs.client_id = auth.uid()
          ))
    )
  );

-- Coaches can manage program exercises
CREATE POLICY "Coaches can manage program exercises"
  ON program_exercises FOR ALL USING (
    EXISTS (
      SELECT 1 FROM program_days
      JOIN programs ON programs.id = program_days.program_id
      WHERE program_days.id = program_exercises.program_day_id
        AND programs.coach_id = auth.uid()
    )
  );

-- Coaches can view client exercise logs
CREATE POLICY "Coaches can view client exercise logs"
  ON exercise_logs FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_sessions ws
      JOIN coach_clients cc ON cc.client_id = ws.client_id
      WHERE ws.id = exercise_logs.session_id
        AND cc.coach_id = auth.uid()
    )
  );

-- Body measurements: clients own, coaches can view
CREATE POLICY "Clients own their body measurements"
  ON body_measurements FOR ALL USING (client_id = auth.uid());

CREATE POLICY "Coaches can view client body measurements"
  ON body_measurements FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM coach_clients
      WHERE coach_clients.coach_id = auth.uid()
        AND coach_clients.client_id = body_measurements.client_id
    )
  );

-- Checkin photos: viewable by client and coach
CREATE POLICY "Clients can manage their checkin photos"
  ON checkin_photos FOR ALL USING (
    EXISTS (
      SELECT 1 FROM checkins
      WHERE checkins.id = checkin_photos.checkin_id
        AND checkins.client_id = auth.uid()
    )
  );

CREATE POLICY "Coaches can view client checkin photos"
  ON checkin_photos FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM checkins
      JOIN coach_clients ON coach_clients.client_id = checkins.client_id
      WHERE checkins.id = checkin_photos.checkin_id
        AND coach_clients.coach_id = auth.uid()
    )
  );

-- Nutrition targets: clients can view, coaches can manage
CREATE POLICY "Clients can view their nutrition targets"
  ON nutrition_targets FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Coaches can manage client nutrition targets"
  ON nutrition_targets FOR ALL USING (
    EXISTS (
      SELECT 1 FROM coach_clients
      WHERE coach_clients.coach_id = auth.uid()
        AND coach_clients.client_id = nutrition_targets.client_id
    )
  );

-- Streaks: coaches can view client streaks
CREATE POLICY "Coaches can view client streaks"
  ON streaks FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM coach_clients
      WHERE coach_clients.coach_id = auth.uid()
        AND coach_clients.client_id = streaks.client_id
    )
  );

-- Subscriptions: coaches can view client subscriptions
CREATE POLICY "Coaches can view client subscriptions"
  ON subscriptions FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM coach_clients
      WHERE coach_clients.coach_id = auth.uid()
        AND coach_clients.client_id = subscriptions.client_id
    )
  );

-- Applications: coaches can update applications (approve/reject)
CREATE POLICY "Coaches can update applications"
  ON applications FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('coach', 'admin')
    )
  );
