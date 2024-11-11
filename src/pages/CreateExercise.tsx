import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useExerciseStore } from '../store/exercises';
import type { ExerciseCategory, ExerciseType } from '../types';

const muscleGroups = [
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Core',
  'Cardio',
  'Other',
];

const categories: { value: ExerciseCategory; label: string }[] = [
  { value: 'strength', label: 'Strength (with weights)' },
  { value: 'bodyweight', label: 'Bodyweight exercises' },
  { value: 'cardio', label: 'Cardio training' },
  { value: 'other', label: 'Other activities' },
];

const exerciseTypes: Record<ExerciseCategory, { value: ExerciseType; label: string }[]> = {
  strength: [
    { value: 'weight-reps', label: 'Weight & Reps (e.g., Bench Press)' },
    { value: 'weight-time', label: 'Weight & Time (e.g., Farmers Walk)' },
  ],
  bodyweight: [
    { value: 'bodyweight-reps', label: 'Reps Only (e.g., Push-ups)' },
    { value: 'bodyweight-time', label: 'Time Only (e.g., Plank)' },
  ],
  cardio: [
    { value: 'cardio', label: 'Time, Distance & Calories (e.g., Running)' },
  ],
  other: [
    { value: 'other', label: 'Notes Only (e.g., Stretching)' },
  ],
};

function CreateExercise() {
  const navigate = useNavigate();
  const addExercise = useExerciseStore((state) => state.addExercise);
  const [exercise, setExercise] = useState({
    name: '',
    muscle: '',
    category: '' as ExerciseCategory,
    type: '' as ExerciseType,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExercise(exercise);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-secondary-900">
      <header className="bg-white dark:bg-secondary-800 border-b border-gray-200 dark:border-secondary-700 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span className="ml-2">Back</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">New Exercise</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Exercise Name
            </label>
            <input
              type="text"
              required
              value={exercise.name}
              onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
              placeholder="e.g., Bench Press"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Muscle Group
            </label>
            <select
              required
              value={exercise.muscle}
              onChange={(e) => setExercise({ ...exercise, muscle: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
            >
              <option value="" className="text-gray-500 dark:text-gray-400">Select muscle group</option>
              {muscleGroups.map((muscle) => (
                <option key={muscle} value={muscle}>
                  {muscle}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Category
            </label>
            <select
              required
              value={exercise.category}
              onChange={(e) => setExercise({
                ...exercise,
                category: e.target.value as ExerciseCategory,
                type: '',
              })}
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
            >
              <option value="" className="text-gray-500 dark:text-gray-400">Select category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {exercise.category && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {exercise.category === 'strength' && 'For exercises using external weights'}
                {exercise.category === 'bodyweight' && 'For exercises using your body weight'}
                {exercise.category === 'cardio' && 'For cardiovascular exercises'}
                {exercise.category === 'other' && 'For miscellaneous activities'}
              </p>
            )}
          </div>

          {exercise.category && (
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Exercise Type
              </label>
              <select
                required
                value={exercise.type}
                onChange={(e) => setExercise({
                  ...exercise,
                  type: e.target.value as ExerciseType,
                })}
                className="w-full rounded-lg border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
              >
                <option value="" className="text-gray-500 dark:text-gray-400">Select exercise type</option>
                {exerciseTypes[exercise.category].map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {exercise.type && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {exercise.type === 'weight-reps' && 'You\'ll track weight and number of repetitions'}
                  {exercise.type === 'weight-time' && 'You\'ll track weight and duration'}
                  {exercise.type === 'bodyweight-reps' && 'You\'ll track number of repetitions'}
                  {exercise.type === 'bodyweight-time' && 'You\'ll track duration'}
                  {exercise.type === 'cardio' && 'You\'ll track time, distance, and calories'}
                  {exercise.type === 'other' && 'You\'ll only track notes'}
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Create Exercise
        </button>
      </form>
    </div>
  );
}

export default CreateExercise;