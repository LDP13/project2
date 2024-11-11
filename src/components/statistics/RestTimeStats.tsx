import React from 'react';
import { BarChart, DoughnutChart } from '../charts';
import { useTranslation } from 'react-i18next';

interface RestTimeStatsProps {
  averageByExercise: Record<string, number>;
  averageByMuscle: Record<string, number>;
  totalAverage: number;
}

function RestTimeStats({ averageByExercise, averageByMuscle, totalAverage }: RestTimeStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t('statistics.recoveryAnalysis')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('exercise.restTime')}
          </p>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-1">
            {t('statistics.averageDuration')}: {Math.round(totalAverage)} {t('exercise.time')}
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(averageByExercise).length > 0 ? (
            <BarChart
              labels={Object.keys(averageByExercise)}
              data={Object.values(averageByExercise)}
              label={t('exercise.restTime')}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              {t('statistics.noDataAvailable')}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t('statistics.recoveryAnalysis')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('exercise.restTime')}
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
              {t('statistics.noDataAvailable')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestTimeStats;