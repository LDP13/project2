import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workout } from '../types';

interface WorkoutStore {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      workouts: [],
      addWorkout: (workout) => 
        set((state) => ({
          workouts: [workout, ...state.workouts],
        })),
      updateWorkout: (workout) =>
        set((state) => ({
          workouts: state.workouts.map((w) => 
            w.id === workout.id ? workout : w
          ),
        })),
      deleteWorkout: (id) =>
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== id),
        })),
    }),
    {
      name: 'workout-storage',
    }
  )
);