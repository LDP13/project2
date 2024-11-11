import React from 'react';
import { BarChart } from '../charts';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t('statistics.weightedVolumeByExercise')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('statistics.volumeFormula')}
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(volumeByExercise).length > 0 ? (
            <BarChart
              labels={Object.keys(volumeByExercise)}
              data={Object.values(volumeByExercise)}
              label={t('statistics.totalVolume')}
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
          <h3 className="text-lg font-semibold">{t('statistics.totalReps')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('statistics.volumeFormula')}
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(repsVolumeByExercise).length > 0 ? (
            <BarChart
              labels={Object.keys(repsVolumeByExercise)}
              data={Object.values(repsVolumeByExercise)}
              label={t('statistics.totalReps')}
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
          <h3 className="text-lg font-semibold">{t('statistics.volumeAnalysis')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('statistics.volumeFormula')}
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(volumeByMuscle).length > 0 ? (
            <BarChart
              labels={Object.keys(volumeByMuscle)}
              data={Object.values(volumeByMuscle)}
              label={t('statistics.totalVolume')}
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
          <h3 className="text-lg font-semibold">{t('statistics.totalReps')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('statistics.volumeFormula')}
          </p>
        </div>
        <div className="h-[300px] relative">
          {Object.keys(repsVolumeByMuscle).length > 0 ? (
            <BarChart
              labels={Object.keys(repsVolumeByMuscle)}
              data={Object.values(repsVolumeByMuscle)}
              label={t('statistics.totalReps')}
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

export default VolumeStats;