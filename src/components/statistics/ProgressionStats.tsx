import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProgressionData {
  currentWeek: {
    weight: number;
    volume: number;
    repsVolume: number;
  };
  lastWeek: {
    weight: number;
    volume: number;
    repsVolume: number;
  };
  twoWeeksAgo: {
    weight: number;
    volume: number;
    repsVolume: number;
  };
  trend: {
    weight: number;
    volume: number;
    repsVolume: number;
  };
  personalBest: {
    weight: number;
    volume: number;
    repsVolume: number;
  };
}

interface ProgressionStatsProps {
  progression: Record<string, ProgressionData>;
}

function ProgressionStats({ progression }: ProgressionStatsProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{t('statistics.progressTracking')}</h2>
      <div className="space-y-6">
        {Object.entries(progression)
          .filter(([_, data]) => 
            data.currentWeek.weight > 0 || 
            data.currentWeek.volume > 0 || 
            data.currentWeek.repsVolume > 0
          )
          .map(([exercise, data]) => (
            <div key={exercise} className="border-b border-gray-100 dark:border-secondary-700 pb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">{exercise}</h3>
              
              {/* Weight Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('exercise.weight')}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      data.trend.weight > 0 
                        ? 'text-green-500' 
                        : data.trend.weight < 0 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                    }`}>
                      {data.trend.weight ? (
                        <>
                          {data.trend.weight > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {Math.abs(data.trend.weight).toFixed(1)}%
                        </>
                      ) : 'N/A'}
                    </span>
                    {data.personalBest.weight > 0 && (
                      <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                        PB: {data.personalBest.weight}kg
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.twoWeeks')}</p>
                    <p className="font-medium">{data.twoWeeksAgo.weight || 'N/A'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.lastWeek')}</p>
                    <p className="font-medium">{data.lastWeek.weight || 'N/A'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.thisWeek')}</p>
                    <p className="font-medium">{data.currentWeek.weight || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Volume Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('statistics.volumeAnalysis')}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      data.trend.volume > 0 
                        ? 'text-green-500' 
                        : data.trend.volume < 0 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                    }`}>
                      {data.trend.volume ? (
                        <>
                          {data.trend.volume > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {Math.abs(data.trend.volume).toFixed(1)}%
                        </>
                      ) : 'N/A'}
                    </span>
                    {data.personalBest.volume > 0 && (
                      <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                        PB: {data.personalBest.volume}kg
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.twoWeeks')}</p>
                    <p className="font-medium">{data.twoWeeksAgo.volume || 'N/A'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.lastWeek')}</p>
                    <p className="font-medium">{data.lastWeek.volume || 'N/A'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.thisWeek')}</p>
                    <p className="font-medium">{data.currentWeek.volume || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Reps Volume Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('statistics.totalReps')}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      data.trend.repsVolume > 0 
                        ? 'text-green-500' 
                        : data.trend.repsVolume < 0 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                    }`}>
                      {data.trend.repsVolume ? (
                        <>
                          {data.trend.repsVolume > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {Math.abs(data.trend.repsVolume).toFixed(1)}%
                        </>
                      ) : 'N/A'}
                    </span>
                    {data.personalBest.repsVolume > 0 && (
                      <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                        PB: {data.personalBest.repsVolume} {t('statistics.totalReps')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.twoWeeks')}</p>
                    <p className="font-medium">{data.twoWeeksAgo.repsVolume || 'N/A'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.lastWeek')}</p>
                    <p className="font-medium">{data.lastWeek.repsVolume || 'N/A'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('statistics.timeRanges.thisWeek')}</p>
                    <p className="font-medium">{data.currentWeek.repsVolume || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default ProgressionStats;