import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useExerciseStore } from '../store/exercises';
import type { ExerciseCategory } from '../types';
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

const categories: { value: ExerciseCategory; label: string; description: string }[] = [
  { 
    value: 'weight-reps', 
    label: 'Force - Poids & Répétitions',
    description: 'Pour les exercices avec poids externes (ex: développé couché, squat)'
  },
  { 
    value: 'weight-time', 
    label: 'Force - Poids & Temps',
    description: 'Pour les exercices avec poids et durée (ex: farmer walk)'
  },
  { 
    value: 'bodyweight-reps', 
    label: 'Poids du corps - Répétitions',
    description: 'Pour les exercices utilisant le poids du corps (ex: pompes, tractions)'
  },
  { 
    value: 'bodyweight-time', 
    label: 'Poids du corps - Temps',
    description: 'Pour les exercices de maintien (ex: planche, suspension)'
  },
  { 
    value: 'cardio', 
    label: 'Cardio',
    description: 'Pour les exercices cardiovasculaires (ex: course, vélo)'
  },
  { 
    value: 'other', 
    label: 'Autre',
    description: 'Pour les autres types d\'activités'
  }
];

function CreateExercise() {
  const navigate = useNavigate();
  const addExercise = useExerciseStore((state) => state.addExercise);
  const { t } = useTranslation();
  const [exercise, setExercise] = useState({
    name: '',
    muscle: '',
    category: '' as ExerciseCategory,
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
              placeholder="ex: Développé couché"
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
              <option value="">{t('exercise.selectMuscleGroup')}</option>
              {muscleGroups.map((muscle) => (
                <option key={muscle} value={muscle}>
                  {t(`muscles.${muscle.toLowerCase()}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Type d'exercice
            </label>
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category.value}
                  className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    exercise.category === category.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-gray-200 dark:border-secondary-700 hover:border-primary-200 dark:hover:border-primary-800'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={exercise.category === category.value}
                      onChange={(e) => setExercise({ ...exercise, category: e.target.value as ExerciseCategory })}
                      className="hidden"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {category.label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {category.description}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
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