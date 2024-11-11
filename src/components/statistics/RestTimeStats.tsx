import React from 'react';
import { BarChart, DoughnutChart } from '../charts';

interface RestTimeStatsProps {
  averageByExercise: Record<string, number>;
  averageByMuscle: Record<string, number>;
  totalAverage: number;
}

function RestTimeStats({ averageByExercise, averageByMuscle, totalAverage }: RestTimeStatsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Rest Time by Exercise</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Average rest time between sets (seconds)
          </p>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-1">
            Overall Average: {Math.round(totalAverage)} seconds
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(averageByExercise).length > 0 ? (
            <BarChart
              labels={Object.keys(averageByExercise)}
              data={Object.values(averageByExercise)}
              label="Rest Time (seconds)"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Rest Time by Muscle Group</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Average rest time distribution per muscle group (seconds)
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(averageByMuscle).length > 0 ? (
            <DoughnutChart
              labels={Object.keys(averageByMuscle)}
              data={Object.values(averageByMuscle)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestTimeStats;