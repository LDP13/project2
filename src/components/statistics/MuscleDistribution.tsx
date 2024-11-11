import React from 'react';
import { DoughnutChart } from '../charts';
import { useTranslation } from 'react-i18next';

interface MuscleDistributionProps {
  trainingFrequency: Record<string, number>;
  volumeDistribution: Record<string, number>;
}

function MuscleDistribution({ trainingFrequency, volumeDistribution }: MuscleDistributionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t('statistics.trainingFrequency')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('statistics.trainingDistribution')}
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
          {Object.keys(volumeDistribution).length > 0 ? (
            <DoughnutChart
              labels={Object.keys(volumeDistribution)}
              data={Object.values(volumeDistribution)}
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

export default MuscleDistribution;