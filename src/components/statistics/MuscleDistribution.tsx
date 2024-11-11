import React from 'react';
import { DoughnutChart } from '../charts';

interface MuscleDistributionProps {
  trainingFrequency: Record<string, number>;
  volumeDistribution: Record<string, number>;
}

function MuscleDistribution({ trainingFrequency, volumeDistribution }: MuscleDistributionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Training Frequency by Muscle Group</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Number of times each muscle group was trained
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(trainingFrequency).length > 0 ? (
            <DoughnutChart
              labels={Object.keys(trainingFrequency)}
              data={Object.values(trainingFrequency)}
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
          <h3 className="text-lg font-semibold">Volume Distribution</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Percentage of total volume per muscle group (kg)
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(volumeDistribution).length > 0 ? (
            <DoughnutChart
              labels={Object.keys(volumeDistribution)}
              data={Object.values(volumeDistribution)}
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

export default MuscleDistribution;