export type ExerciseCategory = 
  | 'weight-reps'    // Force - Poids & Répétitions
  | 'weight-time'    // Force - Poids & Temps
  | 'bodyweight-reps'// Poids du corps - Répétitions
  | 'bodyweight-time'// Poids du corps - Temps
  | 'cardio'         // Cardio - Temps, Distance, Calories
  | 'other';         // Autre - Notes uniquement

export type WorkoutMood = 'great' | 'good' | 'neutral' | 'bad' | 'terrible';

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  category: ExerciseCategory;
}

export interface Set {
  id: string;
  weight?: number;
  reps?: number;
  time?: number;
  distance?: number;
  calories?: number;
  notes?: string;
  _placeholder?: {
    weight?: number;
    reps?: number;
    time?: number;
    distance?: number;
    calories?: number;
    notes?: string;
  };
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  sets: Set[];
  notes?: string;
  restTime?: number;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  startTime?: string;
  endTime?: string;
  exercises: WorkoutExercise[];
  notes?: string;
  mood?: WorkoutMood;
  finalMood?: WorkoutMood;
}

export interface GTGSession {
  id: string;
  exerciseId: string;
  startTime: string;
  interval: number; // in minutes
  targetSets: number;
  setsCompleted: number;
  repsPerSet?: number;
  timePerSet?: number;
  weight?: number;
  date: string;
  isActive: boolean;
  notes?: string;
}

export interface GTGSet {
  id: string;
  sessionId: string;
  timestamp: string;
  date: string;
  reps?: number;
  time?: number;
  weight?: number;
  notes?: string;
}