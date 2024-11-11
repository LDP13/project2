import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import type { Workout as WorkoutType, WorkoutExercise as WorkoutExerciseType } from '../types';
import WorkoutExercise from '../components/WorkoutExercise';
import { useWorkoutStore } from '../store/workouts';

function Workout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { workouts, addWorkout, updateWorkout } = useWorkoutStore();
  const isNew = !id;
  
  const [workout, setWorkout] = useState<WorkoutType>({
    id: id || crypto.randomUUID(),
    name: '',
    date: new Date().toISOString().split('T')[0],
    startTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    exercises: [],
    notes: ''
  });

  useEffect(() => {
    if (id) {
      const existingWorkout = workouts.find(w => w.id === id);
      if (existingWorkout) {
        setWorkout(existingWorkout);
      }
    }
  }, [id, workouts]);

  const handleBack = () => {
    if (workout.exercises.length > 0 || workout.name) {
      if (isNew) {
        addWorkout(workout);
      } else {
        updateWorkout(workout);
      }
    }
    navigate('/home');
  };

  const handleExerciseUpdate = (updatedExercise: WorkoutExerciseType) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === updatedExercise.id ? updatedExercise : ex
      )
    }));
  };

  const handleExerciseDelete = (exerciseId: string) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
    }));
  };

  const handleAddExercise = () => {
    // Save current workout state before navigating
    if (isNew) {
      addWorkout(workout);
    } else {
      updateWorkout(workout);
    }
    navigate('/exercise-selector', { state: { workout } });
  };

  return (
    <div className="pb-4">
      <header className="bg-white dark:bg-secondary-800 border-b border-gray-200 dark:border-secondary-700 sticky top-0 z-10 transition-colors duration-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft size={20} />
            <span className="ml-2">Back</span>
          </button>
        </div>
        
        <div className="px-4 pb-4 space-y-4">
          <input
            type="text"
            placeholder="Workout Name"
            value={workout.name}
            onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
            className="w-full text-xl font-semibold bg-transparent border-none focus:ring-0 p-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 dark:text-gray-300">Date</label>
              <input
                type="date"
                value={workout.date}
                onChange={(e) => setWorkout({ ...workout, date: e.target.value })}
                className="w-full mt-1 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 dark:text-gray-300">Start Time</label>
              <input
                type="time"
                value={workout.startTime}
                onChange={(e) => setWorkout({ ...workout, startTime: e.target.value })}
                className="w-full mt-1 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 dark:text-gray-300">End Time</label>
              <input
                type="time"
                value={workout.endTime || ''}
                onChange={(e) => setWorkout({ ...workout, endTime: e.target.value })}
                className="w-full mt-1 rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <div className="space-y-4">
          {workout.exercises.map((exercise) => (
            <WorkoutExercise
              key={exercise.id}
              exercise={exercise}
              onUpdate={handleExerciseUpdate}
              onDelete={() => handleExerciseDelete(exercise.id)}
            />
          ))}

          <button
            onClick={handleAddExercise}
            className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-secondary-600 rounded-lg text-gray-600 dark:text-gray-300 flex items-center justify-center space-x-2 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors"
          >
            <Plus size={20} />
            <span>Add Exercise</span>
          </button>
          
          {workout.exercises.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p>No exercises added yet</p>
              <p className="text-sm">Click the button above to add exercises</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Workout Notes</h3>
          <textarea
            placeholder="Add notes about your workout..."
            value={workout.notes}
            onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
            className="w-full rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white h-32 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

export default Workout;