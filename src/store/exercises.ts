import { create } from 'zustand';
import type { Exercise } from '../types';

interface ExerciseStore {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
}

const defaultExercises: Exercise[] = [
  // Strength - Weight & Reps
  { id: '1', name: 'Bench Press', muscle: 'Chest', category: 'strength', type: 'weight-reps' },
  { id: '2', name: 'Deadlift', muscle: 'Back', category: 'strength', type: 'weight-reps' },
  
  // Strength - Weight & Time
  { id: '3', name: 'Farmers Walk', muscle: 'Core', category: 'strength', type: 'weight-time' },
  
  // Bodyweight - Reps
  { id: '4', name: 'Push-ups', muscle: 'Chest', category: 'bodyweight', type: 'bodyweight-reps' },
  { id: '5', name: 'Pull-ups', muscle: 'Back', category: 'bodyweight', type: 'bodyweight-reps' },
  
  // Bodyweight - Time
  { id: '6', name: 'Plank', muscle: 'Core', category: 'bodyweight', type: 'bodyweight-time' },
  
  // Cardio
  { id: '7', name: 'Running', muscle: 'Cardio', category: 'cardio', type: 'cardio' },
  { id: '8', name: 'Cycling', muscle: 'Cardio', category: 'cardio', type: 'cardio' },
  
  // Other
  { id: '9', name: 'Stretching', muscle: 'Other', category: 'other', type: 'other' },
];

export const useExerciseStore = create<ExerciseStore>((set) => ({
  exercises: defaultExercises,
  addExercise: (exercise) => set((state) => ({
    exercises: [...state.exercises, { ...exercise, id: crypto.randomUUID() }],
  })),
}));