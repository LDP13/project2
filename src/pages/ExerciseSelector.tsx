import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { useExerciseStore } from '../store/exercises';
import { useWorkoutStore } from '../store/workouts';
import type { Exercise, Workout } from '../types';
import { useTranslation } from 'react-i18next';

const muscleGroups = [
  'chest',
  'back',
  'legs',
  'shoulders',
  'arms',
  'core',
  'cardio',
  'other',
];

interface LocationState {
  workout: Workout;
}

function ExerciseSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { workouts, updateWorkout } = useWorkoutStore();
  const { t } = useTranslation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');
  const exercises = useExerciseStore((state) => state.exercises);

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || exercise.muscle.toLowerCase() === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  const handleExerciseSelect = (exercise: Exercise) => {
    if (!state?.workout) {
      navigate('/home');
      return;
    }

    const workoutExercise = {
      id: crypto.randomUUID(),
      exercise,
      sets: [{
        id: crypto.randomUUID(),
        weight: undefined,
        reps: undefined,
        time: undefined,
        distance: undefined,
        calories: undefined,
        notes: undefined
      }],
      notes: '',
      restTime: 60,
    };

    const currentWorkout = workouts.find(w => w.id === state.workout.id) || state.workout;
    const updatedWorkout = {
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, workoutExercise],
    };

    updateWorkout(updatedWorkout);
    navigate(`/workout/${updatedWorkout.id}`);
  };

  const getExerciseTypeDescription = (category: string, type: string) => {
    if (category === 'strength' && type === 'weight-reps') return t('exercise.trackTypes.weightReps');
    if (category === 'strength' && type === 'weight-time') return t('exercise.trackTypes.weightTime');
    if (category === 'bodyweight' && type === 'bodyweight-reps') return t('exercise.trackTypes.repsOnly');
    if (category === 'bodyweight' && type === 'bodyweight-time') return t('exercise.trackTypes.timeOnly');
    if (category === 'cardio') return t('exercise.trackTypes.cardio');
    if (category === 'other') return t('exercise.trackTypes.notesOnly');
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
      <header className="bg-white dark:bg-secondary-800 border-b border-gray-200 dark:border-secondary-700 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft size={20} />
            <span className="ml-2">{t('common.back')}</span>
          </button>
          <button
            onClick={() => navigate('/create-exercise')}
            className="flex items-center text-primary-600 dark:text-primary-400"
          >
            <Plus size={20} />
            <span className="ml-1">{t('workout.new')}</span>
          </button>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('exercise.searchExercises')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMuscle('all')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedMuscle === 'all'
                  ? 'bg-primary-600 dark:bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-secondary-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {t('common.all')}
            </button>
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedMuscle === muscle
                    ? 'bg-primary-600 dark:bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-secondary-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {t(`muscles.${muscle}`)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="space-y-2">
          {filteredExercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => handleExerciseSelect(exercise)}
              className="w-full text-left bg-white dark:bg-secondary-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-secondary-700"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">{exercise.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t(`muscles.${exercise.muscle.toLowerCase()}`)}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {getExerciseTypeDescription(exercise.category, exercise.type)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExerciseSelector;