import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { WorkoutExercise as WorkoutExerciseType, Set } from '../types';
import ExerciseSet from './ExerciseSet';

interface WorkoutExerciseProps {
  exercise: WorkoutExerciseType;
  onUpdate: (exercise: WorkoutExerciseType) => void;
  onDelete: () => void;
}

function WorkoutExercise({ exercise, onUpdate, onDelete }: WorkoutExerciseProps) {
  const addSet = () => {
    const newSet: Set = {
      id: crypto.randomUUID(),
    };
    onUpdate({
      ...exercise,
      sets: [...exercise.sets, newSet],
    });
  };

  const updateSet = (index: number, updatedSet: Set) => {
    const newSets = [...exercise.sets];
    newSets[index] = updatedSet;
    onUpdate({
      ...exercise,
      sets: newSets,
    });
  };

  const deleteSet = (index: number) => {
    onUpdate({
      ...exercise,
      sets: exercise.sets.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-gray-100 dark:border-secondary-700 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{exercise.exercise.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{exercise.exercise.muscle}</p>
        </div>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          title="Delete exercise"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-2">
        {exercise.sets.map((set, index) => (
          <ExerciseSet
            key={set.id}
            set={set}
            type={exercise.exercise.type}
            onUpdate={(updatedSet) => updateSet(index, updatedSet)}
            onDelete={() => deleteSet(index)}
            index={index}
          />
        ))}
      </div>

      <div className="space-y-4">
        <button
          onClick={addSet}
          className="w-full py-2 border border-gray-200 dark:border-secondary-600 rounded-lg text-gray-600 dark:text-gray-300 flex items-center justify-center space-x-2 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors"
        >
          <Plus size={18} />
          <span>Add Set</span>
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Rest Time (seconds)
          </label>
          <input
            type="number"
            value={exercise.restTime || ''}
            onChange={(e) => onUpdate({
              ...exercise,
              restTime: Number(e.target.value),
            })}
            className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            placeholder="Rest time between sets"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Notes
          </label>
          <textarea
            value={exercise.notes || ''}
            onChange={(e) => onUpdate({
              ...exercise,
              notes: e.target.value,
            })}
            className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            placeholder="Add notes for this exercise..."
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkoutExercise;