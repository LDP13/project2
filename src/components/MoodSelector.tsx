import React from 'react';
import type { WorkoutMood } from '../types';
import { useTranslation } from 'react-i18next';

interface MoodSelectorProps {
  value?: WorkoutMood;
  onChange: (mood: WorkoutMood) => void;
  label: string;
  previousMood?: WorkoutMood;
}

function MoodSelector({ value, onChange, label, previousMood }: MoodSelectorProps) {
  const { t } = useTranslation();

  const moods: { value: WorkoutMood; emoji: string; label: string }[] = [
    { value: 'great', emoji: '😁', label: t('moods.great') },
    { value: 'good', emoji: '🙂', label: t('moods.good') },
    { value: 'neutral', emoji: '😐', label: t('moods.neutral') },
    { value: 'bad', emoji: '😕', label: t('moods.bad') },
    { value: 'terrible', emoji: '😫', label: t('moods.terrible') },
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
        {previousMood && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t('exercise.previous')} {moods.find(m => m.value === previousMood)?.emoji} {moods.find(m => m.value === previousMood)?.label}
          </span>
        )}
      </div>
      <div className="flex justify-between bg-white dark:bg-secondary-800 rounded-lg p-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onChange(mood.value)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              value === mood.value
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : 'hover:bg-gray-100 dark:hover:bg-secondary-700'
            }`}
            title={mood.label}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs mt-1">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;
