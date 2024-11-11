import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { useWorkoutStore } from '../store/workouts';

function Home() {
  const navigate = useNavigate();
  const { workouts, deleteWorkout } = useWorkoutStore();
  const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null);
  
  const handleWorkoutClick = (workoutId: string) => {
    navigate(`/workout/${workoutId}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, workoutId: string) => {
    e.stopPropagation();
    setWorkoutToDelete(workoutId);
  };

  const confirmDelete = () => {
    if (workoutToDelete) {
      deleteWorkout(workoutToDelete);
      setWorkoutToDelete(null);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FitStats</h1>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recent Workouts</h2>
        <div className="space-y-3">
          {workouts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No workouts yet</p>
              <p className="text-sm">Start by creating a new workout!</p>
            </div>
          ) : (
            workouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => handleWorkoutClick(workout.id)}
                className="bg-white dark:bg-secondary-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-secondary-700 space-y-3 cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {workout.name || 'Untitled Workout'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteClick(e, workout.id)}
                      className="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                      title="Delete workout"
                    >
                      <Trash2 size={18} />
                    </button>
                    <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{new Date(workout.date).toLocaleDateString()}</span>
                  </div>
                  {workout.startTime && (
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>
                        {workout.startTime}
                        {workout.endTime && ` - ${workout.endTime}`}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {workout.exercises.map((exercise) => (
                    <span
                      key={exercise.id}
                      className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs"
                    >
                      {exercise.exercise.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {workoutToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Workout
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this workout? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setWorkoutToDelete(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;