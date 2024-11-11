import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ProgressionData {
  currentWeek: number;
  lastWeek: number;
  twoWeeksAgo: number;
  trend: number;
  personalBest: number;
}

interface ProgressionStatsProps {
  progression: Record<string, ProgressionData>;
}

function ProgressionStats({ progression }: ProgressionStatsProps) {
  return (
    <section className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Weight Progression</h2>
      <div className="space-y-4">
        {Object.entries(progression)
          .filter(([_, data]) => data.currentWeek > 0 || data.lastWeek > 0)
          .map(([exercise, data]) => (
            <div key={exercise} className="border-b border-gray-100 dark:border-secondary-700 pb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{exercise}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    data.trend > 0 
                      ? 'text-green-500' 
                      : data.trend < 0 
                        ? 'text-red-500' 
                        : 'text-gray-500'
                  }`}>
                    {data.trend ? (
                      <>
                        {data.trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {Math.abs(data.trend).toFixed(1)}%
                      </>
                    ) : 'N/A'}
                  </span>
                  {data.personalBest > 0 && (
                    <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                      PB: {data.personalBest}kg
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Two Weeks Ago</p>
                  <p className="font-medium">{data.twoWeeksAgo || 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Week</p>
                  <p className="font-medium">{data.lastWeek || 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
                  <p className="font-medium">{data.currentWeek || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default ProgressionStats;