import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { Set, ExerciseType } from '../types';
import RestTimer from './RestTimer';
import { useTranslation } from 'react-i18next';

interface ExerciseSetProps {
  set: Set;
  type: ExerciseType;
  onUpdate: (updatedSet: Set) => void;
  onDelete: () => void;
  index: number;
  restTime?: number;
}

function ExerciseSet({ set, type, onUpdate, onDelete, index, restTime = 60 }: ExerciseSetProps) {
  const [showTimer, setShowTimer] = useState(false);

  const getPlaceholder = (field: keyof Set['_placeholder']) => {
    if (set._placeholder?.[field] !== undefined) {
      return `${set._placeholder[field]}`;
    }
    return '';
  };

  const { t } = useTranslation();

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReps = Number(e.target.value);
    const newSet = { ...set, reps: newReps };
    
    // If reps are entered and there's a weight placeholder, make it the actual value
    if (newReps && set._placeholder?.weight !== undefined && set.weight === undefined) {
      newSet.weight = set._placeholder.weight;
    }
    
    onUpdate(newSet);

    // Show timer when both weight and reps are filled
    if (newSet.weight && newReps) {
      setShowTimer(true);
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = Number(e.target.value);
    onUpdate({ ...set, weight: newWeight });

    // Show timer when both weight and reps are filled
    if (newWeight && set.reps) {
      setShowTimer(true);
    }
  };

  const handleTimerComplete = () => {
    setShowTimer(false);
  };

  const renderSetInputs = () => {
    switch (type) {
      case 'weight-reps':
        return (
          <>
            <input
              type="number"
              value={set.weight || ''}
              onChange={handleWeightChange}
              placeholder={getPlaceholder('weight') || "Weight (kg)"}
              className="w-24 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="number"
              value={set.reps || ''}
              onChange={handleRepsChange}
              placeholder={getPlaceholder('reps') || "Reps"}
              className="w-20 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
            />
          </>
        );

      case 'weight-time':
        return (
          <>
            <input
              type="number"
              value={set.weight || ''}
              onChange={(e) => onUpdate({ ...set, weight: Number(e.target.value) })}
              placeholder={getPlaceholder('weight') || "Weight (kg)"}
              className="w-24 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="number"
              value={set.time || ''}
              onChange={(e) => onUpdate({ ...set, time: Number(e.target.value) })}
              placeholder={getPlaceholder('time') || "Time (sec)"}
              className="w-24 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
            />
          </>
        );

      case 'bodyweight-reps':
        return (
          <input
            type="number"
            value={set.reps || ''}
            onChange={(e) => onUpdate({ ...set, reps: Number(e.target.value) })}
            placeholder={getPlaceholder('reps') || "Reps"}
            className="w-20 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
          />
        );

      case 'bodyweight-time':
        return (
          <input
            type="number"
            value={set.time || ''}
            onChange={(e) => onUpdate({ ...set, time: Number(e.target.value) })}
            placeholder={getPlaceholder('time') || "Time (sec)"}
            className="w-24 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
          />
        );

      case 'cardio':
        return (
          <>
            <input
              type="number"
              value={set.time || ''}
              onChange={(e) => onUpdate({ ...set, time: Number(e.target.value) })}
              placeholder={getPlaceholder('time') || "Time (min)"}
              className="w-24 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="number"
              value={set.distance || ''}
              onChange={(e) => onUpdate({ ...set, distance: Number(e.target.value) })}
              placeholder={getPlaceholder('distance') || "Distance (km)"}
              className="w-24 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="number"
              value={set.calories || ''}
              onChange={(e) => onUpdate({ ...set, calories: Number(e.target.value) })}
              placeholder={getPlaceholder('calories') || "Calories"}
              className="w-24 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3 py-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 w-8">{index + 1}</span>
        {renderSetInputs()}
        <input
          type="text"
          value={set.notes || ''}
          onChange={(e) => onUpdate({ ...set, notes: e.target.value })}
          placeholder={t('exercise.setNotes')}
          className="flex-1 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          title={t('exercise.deleteSet')}
        >
          <Trash2 size={18} />
        </button>
      </div>
      {showTimer && (
        <div className="ml-8">
          <RestTimer 
            duration={restTime} 
            onComplete={handleTimerComplete}
            autoStart={true}
          />
        </div>
      )}
    </div>
  );
}

export default ExerciseSet;