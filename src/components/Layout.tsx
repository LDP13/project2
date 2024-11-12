import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Plus, Settings, BarChart2, Repeat } from 'lucide-react';
import { useThemeStore } from '../store/theme';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = useThemeStore((state) => state.isDark);
  const { t } = useTranslation();
  
  const showNavBar = !location.pathname.includes('/exercise-selector') && 
                    !location.pathname.includes('/create-exercise') &&
                    !location.pathname.includes('/workout/');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-secondary-900 transition-colors duration-200">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
        
        {showNavBar && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary-800 border-t border-gray-200 dark:border-secondary-700 transition-colors duration-200">
            <div className="max-w-md mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <button
                  onClick={() => navigate('/home')}
                  className={`flex flex-col items-center space-y-1 ${
                    location.pathname === '/home' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Home size={24} />
                  <span className="text-xs">{t('common.home')}</span>
                </button>
                
                <button
                  onClick={() => navigate('/gtg')}
                  className={`flex flex-col items-center space-y-1 ${
                    location.pathname === '/gtg' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Repeat size={24} />
                  <span className="text-xs">GTG</span>
                </button>

                <button
                  onClick={() => navigate('/workout/new')}
                  className="flex flex-col items-center justify-center w-16 h-16 bg-primary-600 dark:bg-primary-500 rounded-full -mt-8 text-white shadow-lg"
                >
                  <Plus size={32} />
                </button>

                <button
                  onClick={() => navigate('/statistics')}
                  className={`flex flex-col items-center space-y-1 ${
                    location.pathname === '/statistics' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <BarChart2 size={24} />
                  <span className="text-xs">{t('common.stats')}</span>
                </button>
                
                <button
                  onClick={() => navigate('/settings')}
                  className={`flex flex-col items-center space-y-1 ${
                    location.pathname === '/settings' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Settings size={24} />
                  <span className="text-xs">{t('common.settings')}</span>
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}