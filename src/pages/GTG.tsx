import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Play, Pause, Check, Clock, BarChart2 } from 'lucide-react';
import { useGTGStore } from '../store/gtg';
import { useExerciseStore } from '../store/exercises';
import GTGSessionCard from '../components/gtg/GTGSessionCard';
import GTGStats from '../components/gtg/GTGStats';
import NewGTGSession from '../components/gtg/NewGTGSession';

function GTG() {
  const navigate = useNavigate();
  const [showNewSession, setShowNewSession] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { sessions, getActiveSession } = useGTGStore();
  const exercises = useExerciseStore((state) => state.exercises);
  const activeSession = getActiveSession();

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const handleNewSession = () => {
    if (activeSession) {
      // Show warning that there's already an active session
      if (window.confirm('You have an active session. Do you want to start a new one?')) {
        setShowNewSession(true);
      }
    } else {
      setShowNewSession(true);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Grease the Groove</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStats(true)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <BarChart2 size={24} />
          </button>
          <button
            onClick={handleNewSession}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            <span>New Session</span>
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No GTG sessions yet</p>
            <p className="text-sm">Start a new session to begin training!</p>
          </div>
        ) : (
          sessions.map((session) => (
            <GTGSessionCard
              key={session.id}
              session={session}
              exercise={exercises.find((e) => e.id === session.exerciseId)!}
            />
          ))
        )}
      </div>

      {showNewSession && (
        <NewGTGSession
          onClose={() => setShowNewSession(false)}
          exercises={exercises.filter(e => 
            e.type === 'bodyweight-reps' || e.type === 'bodyweight-time'
          )}
        />
      )}

      {showStats && (
        <GTGStats
          onClose={() => setShowStats(false)}
          sessions={sessions}
          exercises={exercises}
        />
      )}
    </div>
  );
}

export default GTG;