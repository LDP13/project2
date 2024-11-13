import React, { useState, useEffect } from 'react';
import { Clock, Check, AlertCircle } from 'lucide-react';
import type { GTGSession, Exercise, GTGSet } from '../../types';
import { useGTGStore } from '../../store/gtg';

interface GTGSessionCardProps {
  session: GTGSession;
  exercise: Exercise;
}

function GTGSessionCard({ session, exercise }: GTGSessionCardProps) {
  const { addSet, getSetsForSession, completeSession } = useGTGStore();
  const [nextSetTime, setNextSetTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const sets = getSetsForSession(session.id);

  useEffect(() => {
    if (!session.isActive) return;

    const calculateNextSetTime = () => {
      const lastSet = sets[sets.length - 1];
      if (lastSet) {
        const lastSetTime = new Date(lastSet.timestamp);
        return new Date(lastSetTime.getTime() + session.interval * 60000);
      }
      return new Date(new Date(session.startTime).getTime() + session.interval * 60000);
    };

    const next = calculateNextSetTime();
    setNextSetTime(next);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = next.getTime() - now.getTime();

      if (diff <= 0) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Time for your next set!', {
            body: getSetDescription(),
          });
        }
        setTimeLeft('Now!');
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [session, sets, exercise]);

  const getSetDescription = () => {
    const parts = [];
    if (session.repsPerSet) {
      parts.push(`${session.repsPerSet} reps`);
    }
    if (session.timePerSet) {
      parts.push(`${session.timePerSet} seconds`);
    }
    if (session.weight) {
      parts.push(`at ${session.weight}kg`);
    }
    return `${exercise.name}: ${parts.join(' ')}`;
  };

  const handleCompleteSet = () => {
    addSet({
      sessionId: session.id,
      timestamp: new Date().toISOString(),
      reps: session.repsPerSet,
      time: session.timePerSet,
      weight: session.weight,
    });

    if (session.setsCompleted + 1 >= session.targetSets) {
      completeSession(session.id);
    }
  };

  const progress = (session.setsCompleted / session.targetSets) * 100;

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{exercise.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getSetDescription()} every {session.interval} minutes
          </p>
        </div>
        {session.isActive && (
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
            <Clock size={20} />
            <span>{timeLeft}</span>
          </div>
        )}
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
              {session.setsCompleted}/{session.targetSets} sets
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200 dark:bg-primary-900">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
          />
        </div>
      </div>

      {session.isActive && (
        <button
          onClick={handleCompleteSet}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Check size={20} />
          <span>Complete Set</span>
        </button>
      )}
    </div>
  );
}

export default GTGSessionCard;