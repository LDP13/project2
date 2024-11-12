import React from 'react';
import { X } from 'lucide-react';
import type { GTGSession, Exercise } from '../../types';
import { BarChart, LineChart } from '../charts';
import { useGTGStore } from '../../store/gtg';

interface GTGStatsProps {
  onClose: () => void;
  sessions: GTGSession[];
  exercises: Exercise[];
}

function GTGStats({ onClose, sessions, exercises }: GTGStatsProps) {
  const { getSetsForSession } = useGTGStore();

  // Calculate statistics
  const stats = sessions.reduce((acc, session) => {
    const exercise = exercises.find(e => e.id === session.exerciseId);
    if (!exercise) return acc;

    const sets = getSetsForSession(session.id);
    const totalReps = sets.reduce((sum, set) => sum + set.reps, 0);

    if (!acc[exercise.name]) {
      acc[exercise.name] = {
        totalSets: 0,
        totalReps: 0,
        sessions: 0,
        completionRate: 0,
      };
    }

    acc[exercise.name].totalSets += session.setsCompleted;
    acc[exercise.name].totalReps += totalReps;
    acc[exercise.name].sessions += 1;
    acc[exercise.name].completionRate += (session.setsCompleted / session.targetSets) * 100;

    return acc;
  }, {} as Record<string, { totalSets: number; totalReps: number; sessions: number; completionRate: number }>);

  // Calculate averages
  Object.keys(stats).forEach(exercise => {
    stats[exercise].completionRate /= stats[exercise].sessions;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">GTG Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Completion Rates */}
          <div className="bg-white dark:bg-secondary-900 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Completion Rates</h3>
            <div className="h-[300px]">
              <BarChart
                labels={Object.keys(stats)}
                data={Object.values(stats).map(s => s.completionRate)}
                label="Completion Rate (%)"
              />
            </div>
          </div>

          {/* Total Volume */}
          <div className="bg-white dark:bg-secondary-900 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Total Volume</h3>
            <div className="h-[300px]">
              <BarChart
                labels={Object.keys(stats)}
                data={Object.values(stats).map(s => s.totalReps)}
                label="Total Repetitions"
              />
            </div>
          </div>

          {/* Summary Table */}
          <div className="bg-white dark:bg-secondary-900 p-4 rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b dark:border-secondary-700">
                  <th className="text-left py-2">Exercise</th>
                  <th className="text-right py-2">Total Sets</th>
                  <th className="text-right py-2">Total Reps</th>
                  <th className="text-right py-2">Sessions</th>
                  <th className="text-right py-2">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats).map(([exercise, data]) => (
                  <tr key={exercise} className="border-b dark:border-secondary-700">
                    <td className="py-2">{exercise}</td>
                    <td className="text-right">{data.totalSets}</td>
                    <td className="text-right">{data.totalReps}</td>
                    <td className="text-right">{data.sessions}</td>
                    <td className="text-right">{data.completionRate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GTGStats;