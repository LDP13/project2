import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { useWorkoutStore } from '../store/workouts';

function Home() {
  const navigate = useNavigate();
  const workouts = useWorkoutStore((state) => state.workouts);
  
  const handleWorkoutClick = (workoutId: string) => {
    navigate(`/workout/${workoutId}`);
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
                  <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
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
    </div>
  );
}

export default Home;