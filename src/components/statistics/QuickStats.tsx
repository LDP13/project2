import React from 'react';
import { Dumbbell, Clock, Calendar, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface QuickStatsProps {
  totalReps: number;
  totalWeight: number;
  workoutsPerWeek: number;
  avgSessionDuration: number;
}

function QuickStats({ totalReps, totalWeight, workoutsPerWeek, avgSessionDuration }: QuickStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <Dumbbell size={20} />
          <h3 className="font-medium">{t('statistics.totalVolume')}</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{totalReps.toLocaleString()} {t('statistics.totalReps')}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('statistics.totalWeightLifted')} {totalWeight.toLocaleString()} kg
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <Calendar size={20} />
          <h3 className="font-medium">{t('statistics.trainingFrequency')}</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{workoutsPerWeek.toFixed(1)} {t('statistics.sessionsPerWeek')}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('statistics.averageDuration')} {avgSessionDuration} {t('statistics.minutesPerSession')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;