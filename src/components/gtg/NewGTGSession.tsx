import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Exercise } from '../../types';
import { useGTGStore } from '../../store/gtg';

interface NewGTGSessionProps {
  onClose: () => void;
  exercises: Exercise[];
}

function NewGTGSession({ onClose, exercises }: NewGTGSessionProps) {
  const [exerciseId, setExerciseId] = useState('');
  const [interval, setInterval] = useState(60);
  const [targetSets, setTargetSets] = useState(10);
  const [repsPerSet, setRepsPerSet] = useState(5);
  const [startTime, setStartTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
  );
  
  const { addSession, getActiveSession } = useGTGStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If there's an active session, complete it
    const activeSession = getActiveSession();
    if (activeSession) {
      useGTGStore.getState().completeSession(activeSession.id);
    }

    // Create new session
    addSession({
      exerciseId,
      startTime,
      interval,
      targetSets,
      repsPerSet,
      setsCompleted: 0,
      date: new Date().toISOString().split('T')[0],
      isActive: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New GTG Session</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Exercise
            </label>
            <select
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
              required
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            >
              <option value="">Select an exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Interval (minutes)
            </label>
            <input
              type="number"
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value))}
              min="1"
              required
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Target Sets
            </label>
            <input
              type="number"
              value={targetSets}
              onChange={(e) => setTargetSets(parseInt(e.target.value))}
              min="1"
              required
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Reps per Set
            </label>
            <input
              type="number"
              value={repsPerSet}
              onChange={(e) => setRepsPerSet(parseInt(e.target.value))}
              min="1"
              required
              className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Start Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewGTGSession;