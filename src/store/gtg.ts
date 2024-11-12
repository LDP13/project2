import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GTGSession, GTGSet } from '../types';

interface GTGStore {
  sessions: GTGSession[];
  sets: GTGSet[];
  addSession: (session: Omit<GTGSession, 'id'>) => string;
  updateSession: (session: GTGSession) => void;
  deleteSession: (id: string) => void;
  addSet: (set: Omit<GTGSet, 'id'>) => void;
  getSetsForSession: (sessionId: string) => GTGSet[];
  getActiveSession: () => GTGSession | undefined;
  completeSession: (sessionId: string) => void;
}

export const useGTGStore = create<GTGStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      sets: [],
      
      addSession: (sessionData) => {
        const session: GTGSession = {
          ...sessionData,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          sessions: [session, ...state.sessions],
        }));
        return session.id;
      },

      updateSession: (updatedSession) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === updatedSession.id ? updatedSession : session
          ),
        }));
      },

      deleteSession: (id) => {
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
          sets: state.sets.filter((set) => set.sessionId !== id),
        }));
      },

      addSet: (setData) => {
        const newSet: GTGSet = {
          ...setData,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          sets: [...state.sets, newSet],
        }));

        // Update session's setsCompleted count
        const session = get().sessions.find((s) => s.id === setData.sessionId);
        if (session) {
          const updatedSession = {
            ...session,
            setsCompleted: session.setsCompleted + 1,
          };
          get().updateSession(updatedSession);
        }
      },

      getSetsForSession: (sessionId) => {
        return get().sets.filter((set) => set.sessionId === sessionId);
      },

      getActiveSession: () => {
        return get().sessions.find((session) => session.isActive);
      },

      completeSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? { ...session, isActive: false }
              : session
          ),
        }));
      },
    }),
    {
      name: 'gtg-storage',
    }
  )
);