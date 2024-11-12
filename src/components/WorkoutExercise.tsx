import React, { useState } from 'react';
import { Plus, Trash2, ListPlus } from 'lucide-react';
import type { WorkoutExercise as WorkoutExerciseType, Set } from '../types';
import ExerciseSet from './ExerciseSet';
import { useTranslation } from 'react-i18next';

interface WorkoutExerciseProps {
  exercise: WorkoutExerciseType;
  onUpdate: (exercise: WorkoutExerciseType) => void;
  onDelete: () => void;
}

interface QuickAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (numSets: number, reps?: number, weight?: number) => void;
  showWeightInput: boolean;
}

function QuickAddDialog({ isOpen, onClose, onAdd, showWeightInput }: QuickAddDialogProps) {
  const [numSets, setNumSets] = useState(3);
  const [reps, setReps] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(numSets, reps, weight);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Add Sets</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Number of Sets
            </label>
            <input
              type="number"
              value={numSets}
              onChange={(e) => setNumSets(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              required
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Repetitions (optional)
            </label>
            <input
              type="number"
              value={reps || ''}
              onChange={(e) => setReps(e.target.value ? parseInt(e.target.value) : undefined)}
              min="1"
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            />
          </div>

          {showWeightInput && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Weight (kg) (optional)
              </label>
              <input
                type="number"
                value={weight || ''}
                onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : undefined)}
                min="0"
                step="0.5"
                className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Add Sets
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function WorkoutExercise({ exercise, onUpdate, onDelete }: WorkoutExerciseProps) {
  const [showQuickAddDialog, setShowQuickAddDialog] = useState(false);
  const { t } = useTranslation();

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

  const handleQuickAdd = (numSets: number, reps?: number, weight?: number) => {
    const newSets: Set[] = Array.from({ length: numSets }, () => ({
      id: crypto.randomUUID(),
      reps,
      weight,
    }));

    onUpdate({
      ...exercise,
      sets: [...exercise.sets, ...newSets],
    });
  };

  const showWeightInput = exercise.exercise.type.includes('weight');

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
            restTime={exercise.restTime}
          />
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={addSet}
            className="flex-1 py-2 border border-gray-200 dark:border-secondary-600 rounded-lg text-gray-600 dark:text-gray-300 flex items-center justify-center space-x-2 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors"
          >
            <Plus size={18} />
            <span>Add Set</span>
          </button>
          <button
            onClick={() => setShowQuickAddDialog(true)}
            className="flex-1 py-2 border border-gray-200 dark:border-secondary-600 rounded-lg text-gray-600 dark:text-gray-300 flex items-center justify-center space-x-2 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors"
          >
            <ListPlus size={18} />
            <span>Quick Add Sets</span>
          </button>
        </div>

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

      <QuickAddDialog
        isOpen={showQuickAddDialog}
        onClose={() => setShowQuickAddDialog(false)}
        onAdd={handleQuickAdd}
        showWeightInput={showWeightInput}
      />
    </div>
  );
}

export default WorkoutExercise;