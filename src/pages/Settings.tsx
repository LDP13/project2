import React from 'react';
import { Moon, Sun, Globe, User, Palette } from 'lucide-react';
import { useThemeStore } from '../store/theme';
import ColorPicker from '../components/ColorPicker';

function Settings() {
  const { isDark, toggleTheme, colors, setColors } = useThemeStore();

  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Profile</h2>
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-gray-100 dark:border-secondary-700">
          <div className="p-4 flex items-center space-x-4">
            <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
              <User className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Preferences</h2>
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-gray-100 dark:border-secondary-700 divide-y divide-gray-100 dark:divide-secondary-700">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDark ? (
                <Moon className="text-gray-600 dark:text-gray-300" size={20} />
              ) : (
                <Sun className="text-gray-600 dark:text-gray-300" size={20} />
              )}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Theme</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isDark ? 'Dark mode' : 'Light mode'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                isDark ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  isDark ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Palette className="text-gray-600 dark:text-gray-300" size={20} />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Primary Color</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize app accent color
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <ColorPicker
                label="Choose Color"
                value={colors.primary}
                onChange={(color) => setColors({ primary: color })}
              />
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="text-gray-600 dark:text-gray-300" size={20} />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Language</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">English</p>
              </div>
            </div>
            <button className="text-primary-600 dark:text-primary-400 text-sm font-medium">
              Change
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">About</h2>
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-gray-100 dark:border-secondary-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">FitStats v1.0.0</p>
        </div>
      </section>
    </div>
  );
}

export default Settings;