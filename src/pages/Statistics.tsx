import React, { useMemo, useState } from 'react';
import { format, subDays, isWithinInterval, startOfWeek, endOfWeek, differenceInMinutes, subWeeks } from 'date-fns';
import QuickStats from '../components/statistics/QuickStats';
import VolumeStats from '../components/statistics/VolumeStats';
import ProgressionStats from '../components/statistics/ProgressionStats';
import RestTimeStats from '../components/statistics/RestTimeStats';
import MuscleDistribution from '../components/statistics/MuscleDistribution';
import { useWorkoutStore } from '../store/workouts';

function Statistics() {
  const [timeRange, setTimeRange] = useState('30');
  const { workouts } = useWorkoutStore();

  // ... (rest of the data processing code remains the same until the return statement)

  return (
    <div className="p-4 space-y-8 pb-20">
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

      {/* Overview Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Overview</h2>
        <QuickStats
          totalReps={stats.totalReps}
          totalWeight={stats.totalWeight}
          workoutsPerWeek={workoutsPerWeek}
          avgSessionDuration={avgSessionDuration}
        />
      </section>

      {/* Volume Analysis Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Volume Analysis</h2>
        <VolumeStats
          volumeByExercise={stats.volumeByExercise}
          volumeByMuscle={stats.volumeByMuscle}
        />
      </section>

      {/* Progress Tracking Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Progress Tracking</h2>
        <ProgressionStats progression={stats.progression} />
      </section>

      {/* Training Distribution Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Training Distribution</h2>
        <MuscleDistribution
          trainingFrequency={stats.muscleFrequency}
          volumeDistribution={stats.muscleVolume}
        />
      </section>

      {/* Recovery Analysis Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recovery Analysis</h2>
        <RestTimeStats
          averageByExercise={stats.restTimeByExercise}
          averageByMuscle={stats.restTimeByMuscle}
          totalAverage={stats.restTimeCount > 0 ? stats.totalRestTime / stats.restTimeCount : 0}
        />
      </section>
    </div>
  );
}

export default Statistics;