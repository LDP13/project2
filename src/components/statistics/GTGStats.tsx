import React from 'react';
import { BarChart, LineChart } from '../charts';
import { useTranslation } from 'react-i18next';

interface GTGStatsProps {
  stats: {
    totalSets: number;
    totalReps: number;
    completionRate: number;
    volumeByExercise: Record<string, number>;
    setsPerDay: Record<string, number>;
  };
}

function GTGStats({ stats }: GTGStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sets</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSets}</p>
        </div>
        <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reps</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalReps}</p>
        </div>
        <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.completionRate.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Volume by Exercise */}
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Volume by Exercise</h3>
        <div className="h-[300px]">
          <BarChart
            labels={Object.keys(stats.volumeByExercise)}
            data={Object.values(stats.volumeByExercise)}
            label="Total Volume"
          />
        </div>
      </div>

      {/* Sets per Day */}
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Sets per Day</h3>
        <div className="h-[300px]">
          <LineChart
            labels={Object.keys(stats.setsPerDay)}
            data={Object.values(stats.setsPerDay)}
            label="Sets Completed"
          />
        </div>
      </div>
    </div>
  );
}

export default GTGStats;