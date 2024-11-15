import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Workout from './pages/Workout';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import ExerciseSelector from './pages/ExerciseSelector';
import CreateExercise from './pages/CreateExercise';
import GTG from './pages/GTG';
import { useThemeStore } from './store/theme';

export default function App() {
  const { colors } = useThemeStore();

  useEffect(() => {
    // Update CSS variables for theme colors
    document.documentElement.style.setProperty('--color-primary', colors.primary);
  }, [colors]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="workout/:id" element={<Workout />} />
          <Route path="workout/new" element={<Workout />} />
          <Route path="settings" element={<Settings />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="exercise-selector" element={<ExerciseSelector />} />
          <Route path="create-exercise" element={<CreateExercise />} />
          <Route path="gtg" element={<GTG />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}