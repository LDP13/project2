import React from 'react';
import { BarChart } from '../charts';

interface VolumeStatsProps {
  volumeByExercise: Record<string, number>;
  volumeByMuscle: Record<string, number>;
  repsVolumeByExercise: Record<string, number>;
  repsVolumeByMuscle: Record<string, number>;
}

function VolumeStats({ 
  volumeByExercise, 
  volumeByMuscle, 
  repsVolumeByExercise, 
  repsVolumeByMuscle 
}: VolumeStatsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Weighted Volume by Exercise</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total volume (kg) = Weight × Reps × Sets
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(volumeByExercise).length > 0 ? (
            <BarChart
              labels={Object.keys(volumeByExercise)}
              data={Object.values(volumeByExercise)}
              label="Total Volume (kg)"
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
          <h3 className="text-lg font-semibold">Reps Volume by Exercise</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total volume = Reps × Sets
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(repsVolumeByExercise).length > 0 ? (
            <BarChart
              labels={Object.keys(repsVolumeByExercise)}
              data={Object.values(repsVolumeByExercise)}
              label="Total Reps"
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
          <h3 className="text-lg font-semibold">Volume by Muscle Group</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Distribution of total volume across muscle groups (kg)
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(volumeByMuscle).length > 0 ? (
            <BarChart
              labels={Object.keys(volumeByMuscle)}
              data={Object.values(volumeByMuscle)}
              label="Total Volume (kg)"
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
          <h3 className="text-lg font-semibold">Reps Volume by Muscle Group</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Distribution of total reps volume across muscle groups
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(repsVolumeByMuscle).length > 0 ? (
            <BarChart
              labels={Object.keys(repsVolumeByMuscle)}
              data={Object.values(repsVolumeByMuscle)}
              label="Total Reps"
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

export default VolumeStats;