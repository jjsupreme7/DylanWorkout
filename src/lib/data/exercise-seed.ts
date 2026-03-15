/**
 * Exercise seed data from Delan Chan's "Enter the Dragon" guide.
 * Organized by movement pattern with technique cues for the Big 6 compound lifts.
 */

export type MovementPattern =
  | "Squat"
  | "Hinge"
  | "Horizontal Push"
  | "Horizontal Pull"
  | "Vertical Push"
  | "Vertical Pull"
  | "Single Leg"
  | "Isolation";

export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Biceps"
  | "Triceps"
  | "Quadriceps"
  | "Hamstrings"
  | "Glutes"
  | "Calves"
  | "Core"
  | "Lats"
  | "Traps"
  | "Forearms"
  | "Neck"
  | "Full Body";

export interface Exercise {
  name: string;
  muscle_group: MuscleGroup;
  movement_pattern: MovementPattern;
  equipment?: string;
  instructions?: string;
  common_mistakes?: string[];
}

export const EXERCISE_SEED: Exercise[] = [
  // ---------------------------------------------------------------------------
  // SQUAT
  // ---------------------------------------------------------------------------
  {
    name: "Barbell Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Barbell",
    instructions:
      "Stand hip to shoulder width, toes pointed out. Brace core. Drop down naturally with hips and knees bending together, staying upright. Drive through midfoot and explode out of the bottom. Push knees outward.",
    common_mistakes: [
      "Standing too wide or too narrow",
      "Not bracing core",
      "Knees caving in",
      "Rising with hips first",
      "Not going low enough",
      "Rounding at the spine",
    ],
  },
  {
    name: "Sumo Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Barbell",
  },
  {
    name: "Box Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Barbell, Box",
  },
  {
    name: "Front Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Barbell",
  },
  {
    name: "Zercher Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Barbell",
  },
  {
    name: "Anderson Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Barbell, Squat Rack",
  },
  {
    name: "Goblet Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Dumbbell/Kettlebell",
  },
  {
    name: "Platz Squat (Heel Elevated)",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Barbell, Heel Elevation",
  },
  {
    name: "Hindu Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Bodyweight",
  },
  {
    name: "Pistol Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Bodyweight",
  },
  {
    name: "Belt Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Belt Squat Machine",
  },
  {
    name: "Good Morning to Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Squat",
    equipment: "Barbell",
  },

  // ---------------------------------------------------------------------------
  // HINGE
  // ---------------------------------------------------------------------------
  {
    name: "Deadlift",
    muscle_group: "Back",
    movement_pattern: "Hinge",
    equipment: "Barbell",
    instructions:
      "Mid-foot under bar, toes slightly out. Grab bar without moving it. Bend legs to touch bar and push hips back. Brace core, drive hips forward, keep bar close to body.",
    common_mistakes: [
      "Bending legs too much",
      "Moving bar during setup",
      "Thinking about 'pulling' instead of driving hips",
      "Not keeping tight upper back",
      "Bar not in contact with legs",
    ],
  },
  {
    name: "Back Extension",
    muscle_group: "Hamstrings",
    movement_pattern: "Hinge",
    equipment: "Back Extension Bench",
  },
  {
    name: "Romanian Deadlift",
    muscle_group: "Hamstrings",
    movement_pattern: "Hinge",
    equipment: "Barbell",
  },
  {
    name: "Stiff Leg Deadlift",
    muscle_group: "Hamstrings",
    movement_pattern: "Hinge",
    equipment: "Barbell",
  },
  {
    name: "Deficit Deadlift",
    muscle_group: "Back",
    movement_pattern: "Hinge",
    equipment: "Barbell, Platform",
  },
  {
    name: "Sumo Deadlift",
    muscle_group: "Back",
    movement_pattern: "Hinge",
    equipment: "Barbell",
  },
  {
    name: "Trap Bar Deadlift",
    muscle_group: "Back",
    movement_pattern: "Hinge",
    equipment: "Trap Bar",
  },
  {
    name: "Good Morning",
    muscle_group: "Hamstrings",
    movement_pattern: "Hinge",
    equipment: "Barbell",
  },
  {
    name: "Seated Good Morning",
    muscle_group: "Hamstrings",
    movement_pattern: "Hinge",
    equipment: "Barbell, Bench",
  },
  {
    name: "Snatch Grip Deadlift",
    muscle_group: "Back",
    movement_pattern: "Hinge",
    equipment: "Barbell",
  },

  // ---------------------------------------------------------------------------
  // HORIZONTAL PUSH — Compounds
  // ---------------------------------------------------------------------------
  {
    name: "Bench Press",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Barbell, Bench",
    instructions:
      "Comfortable grip shoulder width to slightly outside. Pack shoulders back. Lower bar to chest at nipple level, puff chest up. Drive elbows up, not hands. Use leg drive.",
    common_mistakes: [
      "Flaring elbows",
      "Not touching chest",
      "Loose wrist",
      "Losing upper back tightness",
      "Not using leg drive",
    ],
  },
  {
    name: "Incline Bench Press",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Barbell, Incline Bench",
  },
  {
    name: "Wide Bench Press",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Barbell, Bench",
  },
  {
    name: "Close-Grip Bench Press",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Barbell, Bench",
  },
  {
    name: "Larsen Press",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Barbell, Bench",
  },
  {
    name: "Dumbbell Bench Press",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Dumbbells, Bench",
  },
  {
    name: "Weighted Dip",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Dip Station, Weight Belt",
  },
  {
    name: "Weighted Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Weight Plate",
  },
  {
    name: "Pin Press",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Barbell, Squat Rack",
  },
  {
    name: "Floor Press",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Barbell",
  },

  // ---------------------------------------------------------------------------
  // HORIZONTAL PUSH — Push-Up Variations
  // ---------------------------------------------------------------------------
  {
    name: "Standard Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Wide Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Close/Diamond Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Ring Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Rings",
  },
  {
    name: "Weighted Push-Up (Bodyweight)",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Weight Plate",
  },
  {
    name: "Deficit Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Parallettes/Blocks",
  },
  {
    name: "Finger Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Knuckle Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Jackie Chan Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Pike Push-Up",
    muscle_group: "Shoulders",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Hindu Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Pseudo Planche Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Handstand Push-Up",
    muscle_group: "Shoulders",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "Archer/Side to Side Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },
  {
    name: "One Arm Push-Up",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Bodyweight",
  },

  // ---------------------------------------------------------------------------
  // HORIZONTAL PUSH — Dip Variations
  // ---------------------------------------------------------------------------
  {
    name: "Dips",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Dip Station",
  },
  {
    name: "Weighted Dips",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Dip Station, Weight Belt",
  },
  {
    name: "Straight Bar Dips",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Straight Bar",
  },
  {
    name: "Feet Assisted Dips",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Dip Station",
  },
  {
    name: "Jumping Dips",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Dip Station",
  },
  {
    name: "Ring Dips",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Rings",
  },
  {
    name: "Bulgarian Dips",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Rings",
  },
  {
    name: "RTO Dips",
    muscle_group: "Chest",
    movement_pattern: "Horizontal Push",
    equipment: "Rings",
  },

  // ---------------------------------------------------------------------------
  // HORIZONTAL PULL (ROWS)
  // ---------------------------------------------------------------------------
  {
    name: "Barbell Row",
    muscle_group: "Back",
    movement_pattern: "Horizontal Pull",
    equipment: "Barbell",
    instructions:
      "Load hips back like a deadlift. Brace core and back. Pull explosively toward belly button/sternum. Drive elbows back, raise chest, squeeze shoulder blades.",
    common_mistakes: [
      "Standing too upright",
      "Too much weight",
      "Rounded back or shoulders",
      "Flared elbows",
      "Using too much biceps",
      "Too much momentum",
    ],
  },
  {
    name: "Dumbbell Row",
    muscle_group: "Back",
    movement_pattern: "Horizontal Pull",
    equipment: "Dumbbell, Bench",
  },
  {
    name: "T-Bar Row",
    muscle_group: "Back",
    movement_pattern: "Horizontal Pull",
    equipment: "T-Bar/Landmine",
  },
  {
    name: "Meadows Row",
    muscle_group: "Back",
    movement_pattern: "Horizontal Pull",
    equipment: "Landmine",
  },
  {
    name: "Chest Supported Row",
    muscle_group: "Back",
    movement_pattern: "Horizontal Pull",
    equipment: "Dumbbells, Incline Bench",
  },
  {
    name: "Inverted Row",
    muscle_group: "Back",
    movement_pattern: "Horizontal Pull",
    equipment: "Barbell/Rings",
  },
  {
    name: "Cable Row",
    muscle_group: "Back",
    movement_pattern: "Horizontal Pull",
    equipment: "Cable Machine",
  },
  {
    name: "One Arm Inverted Row",
    muscle_group: "Back",
    movement_pattern: "Horizontal Pull",
    equipment: "Rings/Bar",
  },

  // ---------------------------------------------------------------------------
  // VERTICAL PUSH
  // ---------------------------------------------------------------------------
  {
    name: "Overhead Press",
    muscle_group: "Shoulders",
    movement_pattern: "Vertical Push",
    equipment: "Barbell",
    instructions:
      "Grip right outside shoulder width. Tighten abs and glutes. Keep bar tight against throat. Elbows forward. Move head out of way (double chin). Press vertically, pull head through.",
    common_mistakes: [
      "Grip too wide or too narrow",
      "Wrists too bent",
      "Elbow flare",
      "Pressing forward instead of vertically",
      "Too much lower back arch",
    ],
  },
  {
    name: "Dumbbell Overhead Press",
    muscle_group: "Shoulders",
    movement_pattern: "Vertical Push",
    equipment: "Dumbbells",
  },
  {
    name: "Z Press",
    muscle_group: "Shoulders",
    movement_pattern: "Vertical Push",
    equipment: "Barbell",
  },
  {
    name: "Push Press",
    muscle_group: "Shoulders",
    movement_pattern: "Vertical Push",
    equipment: "Barbell",
  },
  {
    name: "Seated Press",
    muscle_group: "Shoulders",
    movement_pattern: "Vertical Push",
    equipment: "Barbell/Dumbbells, Bench",
  },
  {
    name: "Behind the Neck Press",
    muscle_group: "Shoulders",
    movement_pattern: "Vertical Push",
    equipment: "Barbell",
  },
  {
    name: "Bradford Press",
    muscle_group: "Shoulders",
    movement_pattern: "Vertical Push",
    equipment: "Barbell",
  },
  {
    name: "Arnold Press",
    muscle_group: "Shoulders",
    movement_pattern: "Vertical Push",
    equipment: "Dumbbells",
  },

  // ---------------------------------------------------------------------------
  // VERTICAL PULL
  // ---------------------------------------------------------------------------
  {
    name: "Weighted Pull-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar, Weight Belt",
    instructions:
      "Grab bar shoulder width to slightly outside. Sink into deep lat stretch. Initiate by arching upper back and puffing chest to ceiling. Pull elbows down into sides of hips. Lower with control.",
    common_mistakes: [
      "Not going all the way down",
      "Chin not above bar",
      "Too much momentum",
      "Shoulders rolling forward",
      "Using arms instead of back",
    ],
  },
  {
    name: "Wide Grip Pull-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar",
  },
  {
    name: "Close Grip Pull-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar",
  },
  {
    name: "Sternum Pull-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar",
  },
  {
    name: "Chin-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar",
  },
  {
    name: "Neutral Grip Pull-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar (Neutral Handles)",
  },
  {
    name: "One Arm Pull-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar",
  },
  {
    name: "Feet Assisted Pull-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar",
  },
  {
    name: "Behind the Neck Pull-Up",
    muscle_group: "Back",
    movement_pattern: "Vertical Pull",
    equipment: "Pull-Up Bar",
  },

  // ---------------------------------------------------------------------------
  // SINGLE LEG
  // ---------------------------------------------------------------------------
  {
    name: "Pistol Squat (Single Leg)",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Bodyweight",
  },
  {
    name: "Forward Lunge",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Bodyweight/Dumbbells",
  },
  {
    name: "Reverse Lunge",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Bodyweight/Dumbbells",
  },
  {
    name: "Cossack Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Bodyweight/Kettlebell",
  },
  {
    name: "Bulgarian Split Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Dumbbells, Bench",
  },
  {
    name: "Front Foot Elevated Split Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Dumbbells, Platform",
  },
  {
    name: "Step Up",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Dumbbells, Box",
  },
  {
    name: "Walking Lunge",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Bodyweight/Dumbbells",
  },
  {
    name: "Ass to Grass Split Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Bodyweight/Dumbbells",
  },
  {
    name: "Jumping Lunge",
    muscle_group: "Quadriceps",
    movement_pattern: "Single Leg",
    equipment: "Bodyweight",
  },
  {
    name: "Single Leg RDL",
    muscle_group: "Hamstrings",
    movement_pattern: "Single Leg",
    equipment: "Dumbbell/Kettlebell",
  },
  {
    name: "Curtsy Lunge",
    muscle_group: "Glutes",
    movement_pattern: "Single Leg",
    equipment: "Bodyweight/Dumbbells",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Biceps
  // ---------------------------------------------------------------------------
  {
    name: "Barbell Curl",
    muscle_group: "Biceps",
    movement_pattern: "Isolation",
    equipment: "Barbell",
  },
  {
    name: "Dumbbell Curl",
    muscle_group: "Biceps",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Preacher Curl",
    muscle_group: "Biceps",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbell, Preacher Bench",
  },
  {
    name: "Cable Curl",
    muscle_group: "Biceps",
    movement_pattern: "Isolation",
    equipment: "Cable Machine",
  },
  {
    name: "Hammer Curl",
    muscle_group: "Biceps",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Ring Curl",
    muscle_group: "Biceps",
    movement_pattern: "Isolation",
    equipment: "Rings",
  },
  {
    name: "Incline Curl",
    muscle_group: "Biceps",
    movement_pattern: "Isolation",
    equipment: "Dumbbells, Incline Bench",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Triceps
  // ---------------------------------------------------------------------------
  {
    name: "JM Press",
    muscle_group: "Triceps",
    movement_pattern: "Isolation",
    equipment: "Barbell, Bench",
  },
  {
    name: "DB JM Press / Tricep Rollouts",
    muscle_group: "Triceps",
    movement_pattern: "Isolation",
    equipment: "Dumbbells, Bench",
  },
  {
    name: "Overhead Extension",
    muscle_group: "Triceps",
    movement_pattern: "Isolation",
    equipment: "Dumbbell/Cable",
  },
  {
    name: "Tricep Dips",
    muscle_group: "Triceps",
    movement_pattern: "Isolation",
    equipment: "Dip Station",
  },
  {
    name: "Skullcrushers / Bent Arm Pullover",
    muscle_group: "Triceps",
    movement_pattern: "Isolation",
    equipment: "Barbell/EZ Bar, Bench",
  },
  {
    name: "Pullover to Press",
    muscle_group: "Triceps",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbell, Bench",
  },
  {
    name: "Pushdown",
    muscle_group: "Triceps",
    movement_pattern: "Isolation",
    equipment: "Cable Machine",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Shoulders
  // ---------------------------------------------------------------------------
  {
    name: "Side Raise",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Lateral L Raise",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Lu Raise",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Incline Bench Lateral Raise",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells, Incline Bench",
  },
  {
    name: "Face Pull",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Cable Machine/Band",
  },
  {
    name: "Incline Internal Rotation Press",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells, Incline Bench",
  },
  {
    name: "Decline External Rotation Press",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells, Decline Bench",
  },
  {
    name: "Cuban Press",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Powell Raise",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbell, Incline Bench",
  },
  {
    name: "Archer Pulls",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Band/Cable",
  },
  {
    name: "External Rotation",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbell/Cable/Band",
  },
  {
    name: "Rear Delt Fly",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Cable Reverse Crossover",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Cable Machine",
  },
  {
    name: "Upright Row",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbells",
  },
  {
    name: "High Pulls",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbells",
  },
  {
    name: "Snatch Grip High Pull",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Barbell",
  },
  {
    name: "Pike Push-Up (Shoulders)",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Bodyweight",
  },
  {
    name: "Leaning Lateral Raise",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbell",
  },
  {
    name: "Cable Lateral Raise",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Cable Machine",
  },
  {
    name: "Y Raise Variations",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells/Cable/Band",
  },
  {
    name: "Incline Front Raise",
    muscle_group: "Shoulders",
    movement_pattern: "Isolation",
    equipment: "Dumbbells, Incline Bench",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Chest
  // ---------------------------------------------------------------------------
  {
    name: "Dumbbell Fly",
    muscle_group: "Chest",
    movement_pattern: "Isolation",
    equipment: "Dumbbells, Bench",
  },
  {
    name: "Cable Fly",
    muscle_group: "Chest",
    movement_pattern: "Isolation",
    equipment: "Cable Machine",
  },
  {
    name: "Ring Fly",
    muscle_group: "Chest",
    movement_pattern: "Isolation",
    equipment: "Rings",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Glutes
  // ---------------------------------------------------------------------------
  {
    name: "Hip Thrust",
    muscle_group: "Glutes",
    movement_pattern: "Isolation",
    equipment: "Barbell, Bench",
  },
  {
    name: "Reverse Hypers",
    muscle_group: "Glutes",
    movement_pattern: "Isolation",
    equipment: "Reverse Hyper Machine/Bench",
  },
  {
    name: "Back Extensions (Glutes)",
    muscle_group: "Glutes",
    movement_pattern: "Isolation",
    equipment: "Back Extension Bench",
  },
  {
    name: "Single Leg Bridges",
    muscle_group: "Glutes",
    movement_pattern: "Isolation",
    equipment: "Bodyweight",
  },
  {
    name: "Clamshell",
    muscle_group: "Glutes",
    movement_pattern: "Isolation",
    equipment: "Band",
  },
  {
    name: "AB/Adduction Machine",
    muscle_group: "Glutes",
    movement_pattern: "Isolation",
    equipment: "Machine",
  },
  {
    name: "Glute Kickback",
    muscle_group: "Glutes",
    movement_pattern: "Isolation",
    equipment: "Cable Machine/Bodyweight",
  },
  {
    name: "Kettlebell Swings",
    muscle_group: "Glutes",
    movement_pattern: "Isolation",
    equipment: "Kettlebell",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Hamstrings
  // ---------------------------------------------------------------------------
  {
    name: "Machine Leg Curl",
    muscle_group: "Hamstrings",
    movement_pattern: "Isolation",
    equipment: "Leg Curl Machine",
  },
  {
    name: "Nordic Curl",
    muscle_group: "Hamstrings",
    movement_pattern: "Isolation",
    equipment: "Bodyweight/Nordic Bench",
  },
  {
    name: "Swiss Ball Curl",
    muscle_group: "Hamstrings",
    movement_pattern: "Isolation",
    equipment: "Swiss Ball",
  },
  {
    name: "Gliding Leg Curl",
    muscle_group: "Hamstrings",
    movement_pattern: "Isolation",
    equipment: "Sliders",
  },
  {
    name: "Dumbbell Ham Curl",
    muscle_group: "Hamstrings",
    movement_pattern: "Isolation",
    equipment: "Dumbbell, Bench",
  },
  {
    name: "Floor Slider Curl",
    muscle_group: "Hamstrings",
    movement_pattern: "Isolation",
    equipment: "Sliders",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Quads
  // ---------------------------------------------------------------------------
  {
    name: "Leg Extension",
    muscle_group: "Quadriceps",
    movement_pattern: "Isolation",
    equipment: "Leg Extension Machine",
  },
  {
    name: "Sissy Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Isolation",
    equipment: "Bodyweight",
  },
  {
    name: "Pendulum Sissy Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Isolation",
    equipment: "Sissy Squat Machine",
  },
  {
    name: "Hack Squat",
    muscle_group: "Quadriceps",
    movement_pattern: "Isolation",
    equipment: "Hack Squat Machine",
  },
  {
    name: "Leg Press",
    muscle_group: "Quadriceps",
    movement_pattern: "Isolation",
    equipment: "Leg Press Machine",
  },
  {
    name: "Single Leg Press",
    muscle_group: "Quadriceps",
    movement_pattern: "Isolation",
    equipment: "Leg Press Machine",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Traps
  // ---------------------------------------------------------------------------
  {
    name: "Farmers Walk",
    muscle_group: "Traps",
    movement_pattern: "Isolation",
    equipment: "Dumbbells/Farmer Walk Handles",
  },
  {
    name: "Barbell Shrug",
    muscle_group: "Traps",
    movement_pattern: "Isolation",
    equipment: "Barbell",
  },
  {
    name: "Monkey Shrug",
    muscle_group: "Traps",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbells",
  },
  {
    name: "Snatch Grip High Pull (Traps)",
    muscle_group: "Traps",
    movement_pattern: "Isolation",
    equipment: "Barbell",
  },
  {
    name: "One Arm Leaning Shrug",
    muscle_group: "Traps",
    movement_pattern: "Isolation",
    equipment: "Dumbbell",
  },
  {
    name: "Upright Row (Traps)",
    muscle_group: "Traps",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbells",
  },
  {
    name: "Face Pull (Traps)",
    muscle_group: "Traps",
    movement_pattern: "Isolation",
    equipment: "Cable Machine/Band",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Neck
  // ---------------------------------------------------------------------------
  {
    name: "Neck Extensions",
    muscle_group: "Neck",
    movement_pattern: "Isolation",
    equipment: "Neck Harness/Plate",
  },
  {
    name: "Neck Flexions",
    muscle_group: "Neck",
    movement_pattern: "Isolation",
    equipment: "Neck Harness/Plate",
  },
  {
    name: "Neck Bridge Variations",
    muscle_group: "Neck",
    movement_pattern: "Isolation",
    equipment: "Bodyweight",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Calves
  // ---------------------------------------------------------------------------
  {
    name: "Standing Calf Raise",
    muscle_group: "Calves",
    movement_pattern: "Isolation",
    equipment: "Calf Raise Machine/Smith Machine",
  },
  {
    name: "Seated Calf Raise",
    muscle_group: "Calves",
    movement_pattern: "Isolation",
    equipment: "Seated Calf Raise Machine",
  },
  {
    name: "Knees Over Toes Calf Raise",
    muscle_group: "Calves",
    movement_pattern: "Isolation",
    equipment: "Bodyweight/Slant Board",
  },
  {
    name: "Single Calf Raise",
    muscle_group: "Calves",
    movement_pattern: "Isolation",
    equipment: "Bodyweight/Dumbbell",
  },
  {
    name: "Donkey Calf Raise",
    muscle_group: "Calves",
    movement_pattern: "Isolation",
    equipment: "Machine/Partner",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Back
  // ---------------------------------------------------------------------------
  {
    name: "Y Raise",
    muscle_group: "Back",
    movement_pattern: "Isolation",
    equipment: "Dumbbells/Cable/Band",
  },
  {
    name: "Face Pull (Back)",
    muscle_group: "Back",
    movement_pattern: "Isolation",
    equipment: "Cable Machine/Band",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Lats
  // ---------------------------------------------------------------------------
  {
    name: "Pullup/Pulldown Variations",
    muscle_group: "Lats",
    movement_pattern: "Isolation",
    equipment: "Lat Pulldown Machine/Pull-Up Bar",
  },
  {
    name: "Dumbbell Pullover",
    muscle_group: "Lats",
    movement_pattern: "Isolation",
    equipment: "Dumbbell, Bench",
  },
  {
    name: "Low Rowing Variations",
    muscle_group: "Lats",
    movement_pattern: "Isolation",
    equipment: "Cable Machine",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Forearms
  // ---------------------------------------------------------------------------
  {
    name: "Fat Gripz Exercises",
    muscle_group: "Forearms",
    movement_pattern: "Isolation",
    equipment: "Fat Gripz",
  },
  {
    name: "Wrist Curl",
    muscle_group: "Forearms",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbell",
  },
  {
    name: "Wrist Extension",
    muscle_group: "Forearms",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbell",
  },
  {
    name: "Hammer Zottman Curl",
    muscle_group: "Forearms",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Cross Body Hammer Curl",
    muscle_group: "Forearms",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Hammer Curl (Forearms)",
    muscle_group: "Forearms",
    movement_pattern: "Isolation",
    equipment: "Dumbbells",
  },
  {
    name: "Reverse Curl",
    muscle_group: "Forearms",
    movement_pattern: "Isolation",
    equipment: "Barbell/Dumbbells",
  },
  {
    name: "One Arm Hang",
    muscle_group: "Forearms",
    movement_pattern: "Isolation",
    equipment: "Pull-Up Bar",
  },

  // ---------------------------------------------------------------------------
  // ISOLATION — Abs / Core
  // ---------------------------------------------------------------------------
  {
    name: "Sit Up Variations",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Bodyweight",
  },
  {
    name: "Reverse Crunch",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Bodyweight/Bench",
  },
  {
    name: "Dragon Flag",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Bench",
  },
  {
    name: "Cable Crunch",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Cable Machine",
  },
  {
    name: "Hanging Leg/Knee Raise",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Pull-Up Bar",
  },
  {
    name: "Around the World",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Pull-Up Bar/Bodyweight",
  },
  {
    name: "Cable Chop",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Cable Machine",
  },
  {
    name: "Landmine Twist",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Landmine",
  },
  {
    name: "Side Bend",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Dumbbell/Cable",
  },
  {
    name: "Ab Wheel",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Ab Wheel",
  },
  {
    name: "L Sit",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Parallettes/Rings",
  },
  {
    name: "Hollow Body / Hollow Rock",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Bodyweight",
  },
  {
    name: "Ring Rollout",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "Rings",
  },
  {
    name: "GHD Halo",
    muscle_group: "Core",
    movement_pattern: "Isolation",
    equipment: "GHD Machine",
  },
];
