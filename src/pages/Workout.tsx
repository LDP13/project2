import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Repeat, Check } from 'lucide-react';
import type { Workout as WorkoutType, WorkoutExercise as WorkoutExerciseType, Set, WorkoutMood } from '../types';
import WorkoutExercise from '../components/WorkoutExercise';
import MoodSelector from '../components/MoodSelector';
import { useWorkoutStore } from '../store/workouts';
import { useTranslation } from 'react-i18next';

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

  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [showFinalMoodDialog, setShowFinalMoodDialog] = useState(false);
  const [emptyFields, setEmptyFields] = useState<{ exercise: string; fields: string[] }[]>([]);

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
    if (isNew) {
      addWorkout(workout);
    } else {
      updateWorkout(workout);
    }
    navigate('/exercise-selector', { state: { workout } });
  };

  const handleRepeatWorkout = () => {
    const repeatedWorkout: WorkoutType = {
      id: crypto.randomUUID(),
      name: workout.name,
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      exercises: workout.exercises.map(ex => ({
        ...ex,
        id: crypto.randomUUID(),
        sets: ex.sets.map(set => ({
          id: crypto.randomUUID(),
          weight: undefined,
          reps: undefined,
          time: undefined,
          distance: undefined,
          calories: undefined,
          notes: undefined,
          _placeholder: {
            weight: set.weight,
            reps: set.reps,
            time: set.time,
            distance: set.distance,
            calories: set.calories,
            notes: set.notes,
          }
        }))
      })),
      notes: workout.notes
    };

    addWorkout(repeatedWorkout);
    navigate(`/workout/${repeatedWorkout.id}`);
  };

  const checkEmptyFields = () => {
    const emptyFieldsList: { exercise: string; fields: string[] }[] = [];

    workout.exercises.forEach(exercise => {
      const emptySetFields: string[] = [];
      
      exercise.sets.forEach(set => {
        switch (exercise.exercise.type) {
          case 'weight-reps':
            if (set.weight === undefined) emptySetFields.push('weight');
            if (set.reps === undefined) emptySetFields.push('reps');
            break;
          case 'weight-time':
            if (set.weight === undefined) emptySetFields.push('weight');
            if (set.time === undefined) emptySetFields.push('time');
            break;
          case 'bodyweight-reps':
            if (set.reps === undefined) emptySetFields.push('reps');
            break;
          case 'bodyweight-time':
            if (set.time === undefined) emptySetFields.push('time');
            break;
          case 'cardio':
            if (set.time === undefined) emptySetFields.push('time');
            if (set.distance === undefined) emptySetFields.push('distance');
            if (set.calories === undefined) emptySetFields.push('calories');
            break;
        }
      });

      if (emptySetFields.length > 0) {
        emptyFieldsList.push({
          exercise: exercise.exercise.name,
          fields: [...new Set(emptySetFields)]
        });
      }
    });

    return emptyFieldsList;
  };

  const handleFinishWorkout = () => {
    const foundEmptyFields = checkEmptyFields();
    if (foundEmptyFields.length > 0) {
      setEmptyFields(foundEmptyFields);
      setShowFinishDialog(true);
    } else {
      setShowFinalMoodDialog(true);
    }
  };

  const autoCompleteWorkout = () => {
    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map(exercise => ({
        ...exercise,
        sets: exercise.sets.map(set => {
          const newSet: Set = { ...set };
          
          switch (exercise.exercise.type) {
            case 'weight-reps':
              if (newSet.weight === undefined) {
                newSet.weight = set._placeholder?.weight ?? 0;
              }
              if (newSet.reps === undefined) {
                newSet.reps = set._placeholder?.reps ?? 0;
              }
              break;
            case 'weight-time':
              if (newSet.weight === undefined) {
                newSet.weight = set._placeholder?.weight ?? 0;
              }
              if (newSet.time === undefined) {
                newSet.time = set._placeholder?.time ?? 0;
              }
              break;
            case 'bodyweight-reps':
              if (newSet.reps === undefined) {
                newSet.reps = set._placeholder?.reps ?? 0;
              }
              break;
            case 'bodyweight-time':
              if (newSet.time === undefined) {
                newSet.time = set._placeholder?.time ?? 0;
              }
              break;
            case 'cardio':
              if (newSet.time === undefined) {
                newSet.time = set._placeholder?.time ?? 0;
              }
              if (newSet.distance === undefined) {
                newSet.distance = set._placeholder?.distance ?? 0;
              }
              if (newSet.calories === undefined) {
                newSet.calories = set._placeholder?.calories ?? 0;
              }
              break;
          }
          
          return newSet;
        })
      }))
    };

    setWorkout(updatedWorkout);
    updateWorkout(updatedWorkout);
    setShowFinishDialog(false);
    setShowFinalMoodDialog(true);
  };

  const handleMoodChange = (mood: WorkoutMood) => {
    setWorkout(prev => ({
      ...prev,
      mood
    }));
    updateWorkout({
      ...workout,
      mood
    });
  };

  const handleFinalMoodChange = (finalMood: WorkoutMood) => {
    const updatedWorkout = {
      ...workout,
      finalMood,
      endTime: new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    updateWorkout(updatedWorkout);
    navigate('/home');
  };

  // Find previous workout with the same name for mood comparison
  const previousWorkout = workouts.find(w => 
    w.id !== workout.id && 
    w.name === workout.name && 
    w.endTime !== undefined
  );

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
          <div className="flex items-center space-x-4">
            {!isNew && (
              <button
                onClick={handleRepeatWorkout}
                className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                title="Repeat workout"
              >
                <Repeat size={20} />
                <span className="ml-2">Repeat</span>
              </button>
            )}
            {workout.exercises.length > 0 && (
              <button
                onClick={handleFinishWorkout}
                className="flex items-center bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-lg transition-colors"
              >
                <Check size={20} />
                <span className="ml-2">Finish</span>
              </button>
            )}
          </div>
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

          <MoodSelector
            label="How are you feeling?"
            value={workout.mood}
            onChange={handleMoodChange}
            previousMood={previousWorkout?.finalMood}
          />
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

      {/* Finish Workout Dialog */}
      {showFinishDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Incomplete Workout Data
            </h3>
            <div className="text-gray-600 dark:text-gray-300 mb-6">
              <p className="mb-4">The following exercises have empty fields:</p>
              <ul className="list-disc pl-5 space-y-2">
                {emptyFields.map((item, index) => (
                  <li key={index}>
                    <span className="font-medium">{item.exercise}:</span>{' '}
                    {item.fields.join(', ')}
                  </li>
                ))}
              </ul>
              <p className="mt-4">Would you like to auto-complete these fields with the previous values?</p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowFinishDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={autoCompleteWorkout}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Auto-complete & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Mood Dialog */}
      {showFinalMoodDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              How was your workout?
            </h3>
            <MoodSelector
              label="Rate your workout"
              value={workout.finalMood}
              onChange={handleFinalMoodChange}
              previousMood={previousWorkout?.finalMood}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Workout;