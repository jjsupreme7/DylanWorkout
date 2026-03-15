-- Seed exercises: ~20 common exercises
-- Coach can add more through the app

INSERT INTO exercises (name, muscle_group, equipment, instructions) VALUES
  ('Barbell Bench Press', 'Chest', 'Barbell', 'Lie on bench, grip bar slightly wider than shoulders, lower to chest, press up'),
  ('Incline Dumbbell Press', 'Chest', 'Dumbbell', 'Set bench to 30-45 degrees, press dumbbells from chest to lockout'),
  ('Barbell Back Squat', 'Quadriceps', 'Barbell', 'Bar on upper back, squat to parallel or below, drive through heels'),
  ('Romanian Deadlift', 'Hamstrings', 'Barbell', 'Hinge at hips with slight knee bend, lower bar along legs, squeeze glutes to return'),
  ('Conventional Deadlift', 'Back', 'Barbell', 'Bar over mid-foot, hinge and grip, drive through floor keeping back neutral'),
  ('Barbell Overhead Press', 'Shoulders', 'Barbell', 'Press bar from front delts to overhead lockout, keep core tight'),
  ('Lateral Raise', 'Shoulders', 'Dumbbell', 'Raise dumbbells out to sides until parallel with floor, slight bend in elbows'),
  ('Barbell Row', 'Back', 'Barbell', 'Hinge forward 45 degrees, row bar to lower chest/upper abdomen'),
  ('Pull-Up', 'Back', 'Bodyweight', 'Hang from bar, pull chin over bar, control the descent'),
  ('Lat Pulldown', 'Back', 'Cable', 'Pull bar to upper chest with slight lean back, squeeze lats'),
  ('Barbell Curl', 'Biceps', 'Barbell', 'Curl bar from thighs to shoulders, keep elbows pinned'),
  ('Dumbbell Curl', 'Biceps', 'Dumbbell', 'Alternate or bilateral curls, full range of motion'),
  ('Tricep Pushdown', 'Triceps', 'Cable', 'Push rope or bar down until arms are fully extended'),
  ('Skull Crusher', 'Triceps', 'Barbell', 'Lie on bench, lower bar to forehead, extend arms'),
  ('Leg Press', 'Quadriceps', 'Machine', 'Feet shoulder width on platform, press to near lockout'),
  ('Leg Curl', 'Hamstrings', 'Machine', 'Curl pad toward glutes, squeeze at top'),
  ('Calf Raise', 'Calves', 'Machine', 'Rise onto toes, pause at top, lower with control'),
  ('Hip Thrust', 'Glutes', 'Barbell', 'Upper back on bench, drive hips up with bar across lap'),
  ('Plank', 'Core', 'Bodyweight', 'Hold body in straight line on forearms and toes'),
  ('Cable Crunch', 'Core', 'Cable', 'Kneel with rope behind head, crunch down toward floor')
ON CONFLICT DO NOTHING;
