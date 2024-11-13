import React, { useMemo, useState } from 'react';
import { format, subDays, isWithinInterval, startOfWeek, endOfWeek, differenceInMinutes, subWeeks } from 'date-fns';
import QuickStats from '../components/statistics/QuickStats';
import VolumeStats from '../components/statistics/VolumeStats';
import ProgressionStats from '../components/statistics/ProgressionStats';
import RestTimeStats from '../components/statistics/RestTimeStats';
import MuscleDistribution from '../components/statistics/MuscleDistribution';
import GTGStats from '../components/statistics/GTGStats';
import { useWorkoutStore } from '../store/workouts';
import { useGTGStore } from '../store/gtg';
import { useExerciseStore } from '../store/exercises';
import { useTranslation } from 'react-i18next';

function Statistics() {
  const [timeRange, setTimeRange] = useState('30');
  const { workouts } = useWorkoutStore();
  const { sessions, getSetsForSession } = useGTGStore();
  const exercises = useExerciseStore((state) => state.exercises);
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const daysAgo = parseInt(timeRange);
    const cutoffDate = subDays(new Date(), daysAgo);

    const filteredWorkouts = workouts.filter(workout => 
      new Date(workout.date) >= cutoffDate
    );

    // Initialize stats
    const stats = {
      totalReps: 0,
      totalWeight: 0,
      volumeByExercise: {} as Record<string, number>,
      volumeByMuscle: {} as Record<string, number>,
      repsVolumeByExercise: {} as Record<string, number>,
      repsVolumeByMuscle: {} as Record<string, number>,
      muscleFrequency: {} as Record<string, number>,
      restTimeByExercise: {} as Record<string, number>,
      restTimeByMuscle: {} as Record<string, number>,
      totalRestTime: 0,
      restTimeCount: 0,
      progression: {} as Record<string, {
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
      }>,
      gtg: {
        totalSets: 0,
        totalReps: 0,
        completionRate: 0,
        volumeByExercise: {} as Record<string, number>,
        setsPerDay: {} as Record<string, number>,
      }
    };

    // Process workouts
    filteredWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        const exerciseName = exercise.exercise.name;
        const muscleName = exercise.exercise.muscle;

        // Update muscle frequency
        stats.muscleFrequency[muscleName] = (stats.muscleFrequency[muscleName] || 0) + 1;

        // Process sets
        let exerciseVolume = 0;
        let exerciseRepsVolume = 0;

        exercise.sets.forEach(set => {
          if (set.reps) {
            exerciseRepsVolume += set.reps;
            
            if (set.weight) {
              const setVolume = set.reps * set.weight;
              exerciseVolume += setVolume;
              stats.totalWeight += setVolume;
            }
            
            stats.totalReps += set.reps;
          }
        });

        // Update volume by exercise
        stats.volumeByExercise[exerciseName] = (stats.volumeByExercise[exerciseName] || 0) + exerciseVolume;
        stats.repsVolumeByExercise[exerciseName] = (stats.repsVolumeByExercise[exerciseName] || 0) + exerciseRepsVolume;

        // Update volume by muscle
        stats.volumeByMuscle[muscleName] = (stats.volumeByMuscle[muscleName] || 0) + exerciseVolume;
        stats.repsVolumeByMuscle[muscleName] = (stats.repsVolumeByMuscle[muscleName] || 0) + exerciseRepsVolume;

        // Process rest times
        if (exercise.restTime) {
          stats.restTimeByExercise[exerciseName] = stats.restTimeByExercise[exerciseName] 
            ? (stats.restTimeByExercise[exerciseName] + exercise.restTime) / 2
            : exercise.restTime;

          stats.restTimeByMuscle[muscleName] = stats.restTimeByMuscle[muscleName]
            ? (stats.restTimeByMuscle[muscleName] + exercise.restTime) / 2
            : exercise.restTime;

          stats.totalRestTime += exercise.restTime;
          stats.restTimeCount++;
        }
      });
    });

    // Process GTG sessions
    const filteredSessions = sessions.filter(session => 
      new Date(session.date) >= cutoffDate
    );

    filteredSessions.forEach(session => {
      const exercise = exercises.find(e => e.id === session.exerciseId);
      if (!exercise) return;

      const sets = getSetsForSession(session.id);
      
      // Update GTG stats
      stats.gtg.totalSets += session.setsCompleted;
      stats.gtg.completionRate += (session.setsCompleted / session.targetSets) * 100;

      // Calculate volume
      let sessionVolume = 0;
      sets.forEach(set => {
        if (set.reps) {
          stats.gtg.totalReps += set.reps;
          if (set.weight) {
            sessionVolume += set.reps * set.weight;
          }
        }
      });

      // Update volume by exercise
      stats.gtg.volumeByExercise[exercise.name] = (stats.gtg.volumeByExercise[exercise.name] || 0) + sessionVolume;

      // Track sets per day
      stats.gtg.setsPerDay[session.date] = (stats.gtg.setsPerDay[session.date] || 0) + session.setsCompleted;
    });

    // Calculate average completion rate
    if (filteredSessions.length > 0) {
      stats.gtg.completionRate /= filteredSessions.length;
    }

    // Calculate progression
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        const exerciseName = exercise.exercise.name;
        if (!stats.progression[exerciseName]) {
          stats.progression[exerciseName] = {
            currentWeek: { weight: 0, volume: 0, repsVolume: 0 },
            lastWeek: { weight: 0, volume: 0, repsVolume: 0 },
            twoWeeksAgo: { weight: 0, volume: 0, repsVolume: 0 },
            trend: { weight: 0, volume: 0, repsVolume: 0 },
            personalBest: { weight: 0, volume: 0, repsVolume: 0 }
          };
        }

        const maxWeight = Math.max(...exercise.sets.map(set => set.weight || 0));
        let totalVolume = 0;
        let totalRepsVolume = 0;

        exercise.sets.forEach(set => {
          if (set.reps) {
            totalRepsVolume += set.reps;
            if (set.weight) {
              totalVolume += set.reps * set.weight;
            }
          }
        });

        const workoutDate = new Date(workout.date);
        const today = new Date();
        const oneWeekAgo = subWeeks(today, 1);
        const twoWeeksAgo = subWeeks(today, 2);

        // Update personal bests
        if (maxWeight > stats.progression[exerciseName].personalBest.weight) {
          stats.progression[exerciseName].personalBest.weight = maxWeight;
        }
        if (totalVolume > stats.progression[exerciseName].personalBest.volume) {
          stats.progression[exerciseName].personalBest.volume = totalVolume;
        }
        if (totalRepsVolume > stats.progression[exerciseName].personalBest.repsVolume) {
          stats.progression[exerciseName].personalBest.repsVolume = totalRepsVolume;
        }

        // Update weekly stats
        if (workoutDate >= oneWeekAgo) {
          stats.progression[exerciseName].currentWeek.weight = Math.max(
            stats.progression[exerciseName].currentWeek.weight,
            maxWeight
          );
          stats.progression[exerciseName].currentWeek.volume = Math.max(
            stats.progression[exerciseName].currentWeek.volume,
            totalVolume
          );
          stats.progression[exerciseName].currentWeek.repsVolume = Math.max(
            stats.progression[exerciseName].currentWeek.repsVolume,
            totalRepsVolume
          );
        } else if (workoutDate >= twoWeeksAgo) {
          stats.progression[exerciseName].lastWeek.weight = Math.max(
            stats.progression[exerciseName].lastWeek.weight,
            maxWeight
          );
          stats.progression[exerciseName].lastWeek.volume = Math.max(
            stats.progression[exerciseName].lastWeek.volume,
            totalVolume
          );
          stats.progression[exerciseName].lastWeek.repsVolume = Math.max(
            stats.progression[exerciseName].lastWeek.repsVolume,
            totalRepsVolume
          );
        } else if (workoutDate >= subWeeks(today, 3)) {
          stats.progression[exerciseName].twoWeeksAgo.weight = Math.max(
            stats.progression[exerciseName].twoWeeksAgo.weight,
            maxWeight
          );
          stats.progression[exerciseName].twoWeeksAgo.volume = Math.max(
            stats.progression[exerciseName].twoWeeksAgo.volume,
            totalVolume
          );
          stats.progression[exerciseName].twoWeeksAgo.repsVolume = Math.max(
            stats.progression[exerciseName].twoWeeksAgo.repsVolume,
            totalRepsVolume
          );
        }
      });
    });

    // Calculate trends
    Object.keys(stats.progression).forEach(exercise => {
      const current = stats.progression[exercise].currentWeek;
      const last = stats.progression[exercise].lastWeek;
      
      if (current.weight && last.weight) {
        stats.progression[exercise].trend.weight = ((current.weight - last.weight) / last.weight) * 100;
      }
      if (current.volume && last.volume) {
        stats.progression[exercise].trend.volume = ((current.volume - last.volume) / last.volume) * 100;
      }
      if (current.repsVolume && last.repsVolume) {
        stats.progression[exercise].trend.repsVolume = ((current.repsVolume - last.repsVolume) / last.repsVolume) * 100;
      }
    });

    return stats;
  }, [workouts, timeRange, sessions, exercises, getSetsForSession]);

  // Calculate workouts per week
  const workoutsPerWeek = useMemo(() => {
    const daysAgo = parseInt(timeRange);
    const weeks = daysAgo / 7;
    return workouts.length / weeks;
  }, [workouts.length, timeRange]);

  // Calculate average session duration
  const avgSessionDuration = useMemo(() => {
    const completedWorkouts = workouts.filter(w => w.startTime && w.endTime);
    if (completedWorkouts.length === 0) return 0;

    const totalMinutes = completedWorkouts.reduce((total, workout) => {
      if (workout.startTime && workout.endTime) {
        const start = new Date(`1970-01-01T${workout.startTime}`);
        const end = new Date(`1970-01-01T${workout.endTime}`);
        return total + differenceInMinutes(end, start);
      }
      return total;
    }, 0);

    return Math.round(totalMinutes / completedWorkouts.length);
  }, [workouts]);

  return (
    <div className="p-4 space-y-8 pb-20">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('statistics.title')}</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-lg border-gray-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
        >
          <option value="7">{t('statistics.timeRanges.7')}</option>
          <option value="30">{t('statistics.timeRanges.30')}</option>
          <option value="90">{t('statistics.timeRanges.90')}</option>
        </select>
      </header>

      {/* Overview Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('statistics.overview')}</h2>
        <QuickStats
          totalReps={stats.totalReps + stats.gtg.totalReps}
          totalWeight={stats.totalWeight}
          workoutsPerWeek={workoutsPerWeek}
          avgSessionDuration={avgSessionDuration}
        />
      </section>

      {/* Volume Analysis Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('statistics.volumeAnalysis')}</h2>
        <VolumeStats
          volumeByExercise={stats.volumeByExercise}
          volumeByMuscle={stats.volumeByMuscle}
          repsVolumeByExercise={stats.repsVolumeByExercise}
          repsVolumeByMuscle={stats.repsVolumeByMuscle}
        />
      </section>

      {/* GTG Stats Section */}
      {sessions.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">GTG Statistics</h2>
          <GTGStats stats={stats.gtg} />
        </section>
      )}

      {/* Progress Tracking Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('statistics.progressTracking')}</h2>
        <ProgressionStats progression={stats.progression} />
      </section>

      {/* Training Distribution Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('statistics.trainingDistribution')}</h2>
        <MuscleDistribution
          trainingFrequency={stats.muscleFrequency}
          volumeDistribution={stats.volumeByMuscle}
        />
      </section>

      {/* Recovery Analysis Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('statistics.recoveryAnalysis')}</h2>
        <RestTimeStats
          averageByExercise={stats.restTimeByExercise}
          averageByMuscle={stats.restTimeByMuscle}
          totalAverage={stats.restTimeCount > 0 ? stats.totalRestTime / stats.restTimeCount : 0}
        />
      </section>
    </div>
  );
}

export default Statistics;