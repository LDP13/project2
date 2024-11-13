import { create } from 'zustand';
import type { Exercise } from '../types';

interface ExerciseStore {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
}

const defaultExercises: Exercise[] = [
  // Force - Poids & Répétitions
  { id: '1', name: 'Développé couché', muscle: 'Chest', category: 'weight-reps' },
  { id: '2', name: 'Squat', muscle: 'Legs', category: 'weight-reps' },
  
  // Force - Poids & Temps
  { id: '3', name: 'Farmer Walk', muscle: 'Core', category: 'weight-time' },
  
  // Poids du corps - Répétitions
  { id: '4', name: 'Pompes', muscle: 'Chest', category: 'bodyweight-reps' },
  { id: '5', name: 'Tractions', muscle: 'Back', category: 'bodyweight-reps' },
  
  // Poids du corps - Temps
  { id: '6', name: 'Planche', muscle: 'Core', category: 'bodyweight-time' },
  
  // Cardio
  { id: '7', name: 'Course', muscle: 'Cardio', category: 'cardio' },
  { id: '8', name: 'Vélo', muscle: 'Cardio', category: 'cardio' },
  
  // Autre
  { id: '9', name: 'Étirements', muscle: 'Other', category: 'other' },
];

export const useExerciseStore = create<ExerciseStore>((set) => ({
  exercises: defaultExercises,
  addExercise: (exercise) => set((state) => ({
    exercises: [...state.exercises, { ...exercise, id: crypto.randomUUID() }],
  })),
}));