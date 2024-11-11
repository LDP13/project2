import React from 'react';
import { Dumbbell, Clock, Calendar, TrendingUp } from 'lucide-react';

interface QuickStatsProps {
  totalReps: number;
  totalWeight: number;
  workoutsPerWeek: number;
  avgSessionDuration: number;
}

function QuickStats({ totalReps, totalWeight, workoutsPerWeek, avgSessionDuration }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <Dumbbell size={20} />
          <h3 className="font-medium">Total Volume</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{totalReps.toLocaleString()} reps</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Weight Lifted: {totalWeight.toLocaleString()} kg
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <Calendar size={20} />
          <h3 className="font-medium">Training Frequency</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{workoutsPerWeek.toFixed(1)} sessions/week</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Average Duration: {avgSessionDuration} minutes/session
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;