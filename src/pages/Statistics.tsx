import React, { useMemo, useState } from 'react';
import { format, subDays, isWithinInterval, startOfWeek, endOfWeek, differenceInMinutes } from 'date-fns';
import { BarChart, LineChart, DoughnutChart } from '../components/charts';
import { useWorkoutStore } from '../store/workouts';
import { Calendar, Clock, Dumbbell, TrendingUp } from 'lucide-react';

function Statistics() {
  const [timeRange, setTimeRange] = useState('30');
  const { workouts } = useWorkoutStore();

  const filteredWorkouts = useMemo(() => {
    const cutoffDate = subDays(new Date(), parseInt(timeRange));
    return workouts.filter(workout => 
      new Date(workout.date) >= cutoffDate
    );
  }, [workouts, timeRange]);

  const volumeStats = useMemo(() => {
    const stats = {
      totalReps: 0,
      volumeByMuscle: {} as Record<string, number>,
    };

    filteredWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        const muscle = exercise.exercise.muscle;
        if (!stats.volumeByMuscle[muscle]) {
          stats.volumeByMuscle[muscle] = 0;
        }

        exercise.sets.forEach(set => {
          if (set.reps) {
            stats.totalReps += set.reps;
            stats.volumeByMuscle[muscle] += set.reps;
          }
        });
      });
    });

    return stats;
  }, [filteredWorkouts]);

  const weightStats = useMemo(() => {
    const stats = {
      totalWeight: 0,
      maxWeightByExercise: {} as Record<string, number>,
    };

    filteredWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        const exerciseName = exercise.exercise.name;

        exercise.sets.forEach(set => {
          if (set.weight && set.reps) {
            const setVolume = set.weight * set.reps;
            stats.totalWeight += setVolume;

            if (!stats.maxWeightByExercise[exerciseName] || 
                set.weight > stats.maxWeightByExercise[exerciseName]) {
              stats.maxWeightByExercise[exerciseName] = set.weight;
            }
          }
        });
      });
    });

    return stats;
  }, [filteredWorkouts]);

  const frequencyStats = useMemo(() => {
    const stats = {
      workoutsPerWeek: 0,
      averageWorkoutDuration: 0,
    };

    if (filteredWorkouts.length === 0) return stats;

    // Calculate workouts per week
    const weeks = parseInt(timeRange) / 7;
    stats.workoutsPerWeek = filteredWorkouts.length / weeks;

    // Calculate average duration
    let totalDuration = 0;
    let workoutsWithDuration = 0;

    filteredWorkouts.forEach(workout => {
      if (workout.startTime && workout.endTime) {
        const start = new Date(`2000-01-01T${workout.startTime}`);
        const end = new Date(`2000-01-01T${workout.endTime}`);
        const duration = differenceInMinutes(end, start);
        if (duration > 0) {
          totalDuration += duration;
          workoutsWithDuration++;
        }
      }
    });

    stats.averageWorkoutDuration = workoutsWithDuration > 0 
      ? totalDuration / workoutsWithDuration 
      : 0;

    return stats;
  }, [filteredWorkouts, timeRange]);

  const progressionData = useMemo(() => {
    const data: Record<string, { dates: string[], weights: number[] }> = {};

    // Sort workouts by date
    const sortedWorkouts = [...filteredWorkouts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    sortedWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        const name = exercise.exercise.name;
        if (!data[name]) {
          data[name] = { dates: [], weights: [] };
        }

        // Find max weight for this exercise in this workout
        const maxWeight = Math.max(
          ...exercise.sets
            .map(set => set.weight || 0)
            .filter(weight => weight > 0)
        );

        if (maxWeight > 0) {
          data[name].dates.push(format(new Date(workout.date), 'MMM d'));
          data[name].weights.push(maxWeight);
        }
      });
    });

    // Only keep exercises with more than one data point
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value.weights.length > 1)
    );
  }, [filteredWorkouts]);

  const restTimeStats = useMemo(() => {
    const stats = {
      restTimeByMuscle: {} as Record<string, { total: number; count: number }>,
    };

    filteredWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        const muscle = exercise.exercise.muscle;
        if (!stats.restTimeByMuscle[muscle]) {
          stats.restTimeByMuscle[muscle] = { total: 0, count: 0 };
        }

        if (exercise.restTime) {
          stats.restTimeByMuscle[muscle].total += exercise.restTime;
          stats.restTimeByMuscle[muscle].count++;
        }
      });
    });

    return stats;
  }, [filteredWorkouts]);

  return (
    <div className="p-4 space-y-6 pb-20">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
            <Dumbbell size={20} />
            <h3 className="font-medium">Total Volume</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{volumeStats.totalReps} reps</p>
        </div>

        <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
            <TrendingUp size={20} />
            <h3 className="font-medium">Total Weight</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{Math.round(weightStats.totalWeight)} kg</p>
        </div>

        <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
            <Calendar size={20} />
            <h3 className="font-medium">Workouts/Week</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{frequencyStats.workoutsPerWeek.toFixed(1)}</p>
        </div>

        <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
            <Clock size={20} />
            <h3 className="font-medium">Avg Duration</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{Math.round(frequencyStats.averageWorkoutDuration)} min</p>
        </div>
      </div>

      {/* Volume by Muscle Group */}
      <section className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Volume by Muscle Group</h2>
        <div className="h-[300px] relative">
          {Object.keys(volumeStats.volumeByMuscle).length > 0 ? (
            <DoughnutChart
              labels={Object.keys(volumeStats.volumeByMuscle)}
              data={Object.values(volumeStats.volumeByMuscle)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </section>

      {/* Weight Progression */}
      {Object.entries(progressionData).map(([exercise, data]) => (
        <section key={exercise} className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{exercise} Progression</h3>
          <div className="h-[200px] relative">
            {data.weights.length > 0 ? (
              <LineChart
                labels={data.dates}
                data={data.weights}
                label="Weight (kg)"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Rest Time Analysis */}
      <section className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Rest Time by Muscle Group</h2>
        <div className="h-[300px] relative">
          {Object.keys(restTimeStats.restTimeByMuscle).length > 0 ? (
            <BarChart
              labels={Object.keys(restTimeStats.restTimeByMuscle)}
              data={Object.entries(restTimeStats.restTimeByMuscle).map(
                ([_, stats]) => stats.total / Math.max(stats.count, 1)
              )}
              label="Average Rest Time (seconds)"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </section>

      {/* Max Weights */}
      <section className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Personal Records</h2>
        {Object.keys(weightStats.maxWeightByExercise).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(weightStats.maxWeightByExercise).map(([exercise, weight]) => (
              <div key={exercise} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-secondary-700 last:border-0">
                <span className="text-gray-700 dark:text-gray-300">{exercise}</span>
                <span className="font-medium">{weight} kg</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No records available
          </div>
        )}
      </section>
    </div>
  );
}

export default Statistics;