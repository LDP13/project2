export type ExerciseCategory = 'strength' | 'bodyweight' | 'cardio' | 'other';

export type ExerciseType = 
  | 'weight-reps'    // Strength - Weight & Reps
  | 'weight-time'    // Strength - Weight & Time
  | 'bodyweight-reps'// Bodyweight - Reps only
  | 'bodyweight-time'// Bodyweight - Time only
  | 'cardio'         // Cardio - Time, Distance, Calories
  | 'other';         // Other - Notes only

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  category: ExerciseCategory;
  type: ExerciseType;
}

export interface Set {
  id: string;
  weight?: number;
  reps?: number;
  time?: number;
  distance?: number;
  calories?: number;
  notes?: string;
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
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
  };
}