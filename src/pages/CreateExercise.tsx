import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useExerciseStore } from '../store/exercises';
import type { ExerciseCategory, ExerciseType } from '../types';
import { useTranslation } from 'react-i18next';

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
  { value: 'strength', label: 'exercise.categories.strength' },
  { value: 'bodyweight', label: 'exercise.categories.bodyweight' },
  { value: 'cardio', label: 'exercise.categories.cardio' },
  { value: 'other', label: 'exercise.categories.other' },
];

const exerciseTypes: Record<ExerciseCategory, { value: ExerciseType; label: string }[]> = {
  strength: [
    { value: 'weight-reps', label: 'exercise.trackTypes.weightReps' },
    { value: 'weight-time', label: 'exercise.trackTypes.weightTime' },
  ],
  bodyweight: [
    { value: 'bodyweight-reps', label: 'exercise.trackTypes.repsOnly' },
    { value: 'bodyweight-time', label: 'exercise.trackTypes.timeOnly' },
  ],
  cardio: [
    { value: 'cardio', label: 'exercise.trackTypes.cardio' },
  ],
  other: [
    { value: 'other', label: 'exercise.trackTypes.notesOnly' },
  ],
};

const typeTranslationKeys: { [key: string]: string } = {
  'weight-reps': 'weightReps',
  'weight-time': 'weightTime',
  'reps-only': 'repsOnly',
  'time-only': 'timeOnly',
  'cardio': 'cardio',
  'notes-only': 'notesOnly'
};

function CreateExercise() {
  const navigate = useNavigate();
  const addExercise = useExerciseStore((state) => state.addExercise);
  const { t } = useTranslation();
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
            <span className="ml-2">{t('common.back')}</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{t('exercise.create.title')}</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              {t('exercise.name')}
            </label>
            <input
              type="text"
              required
              value={exercise.name}
              onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
              placeholder={t('exercise.create.namePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              {t('exercise.muscleGroup')}
            </label>
            <select
              required
              value={exercise.muscle}
              onChange={(e) => setExercise({ ...exercise, muscle: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
            >
              <option value="" className="text-gray-500 dark:text-gray-400">{t('exercise.selectMuscleGroup')}</option>
              {muscleGroups.map((muscle) => (
                <option key={muscle} value={muscle}>
                  {t(`muscles.${muscle.toLowerCase()}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              {t('exercise.category')}
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
              <option value="" className="text-gray-500 dark:text-gray-400">{t('exercise.selectCategory')}</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {t(category.label)}
                </option>
              ))}
            </select>
            {exercise.category && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {t(`exercise.create.categoryHelp.${exercise.category}`)}
              </p>
            )}
          </div>

          {exercise.category && (
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                {t('exercise.type')}
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
                <option value="" className="text-gray-500 dark:text-gray-400">{t('exercise.selectType')}</option>
                {exerciseTypes[exercise.category].map((type) => (
                  <option key={type.value} value={type.value}>
                    {t(type.label)}
                  </option>
                ))}
              </select>
              {exercise.type && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {t(`exercise.create.typeHelp.${typeTranslationKeys[exercise.type]}`)}
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
        >
          {t('exercise.createExercise')}
        </button>
      </form>
    </div>
  );
}

export default CreateExercise;