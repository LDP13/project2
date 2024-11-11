import React from 'react';
import { Moon, Sun, Globe, User, Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../store/theme';
import ColorPicker from '../components/ColorPicker';
import LanguageSelector from '../components/LanguageSelector';

function Settings() {
  const { t } = useTranslation();
  const { isDark, toggleTheme, colors, setColors } = useThemeStore();

  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('common.settings')}</h1>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('settings.profile')}</h2>
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
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('settings.preferences')}</h2>
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-gray-100 dark:border-secondary-700 divide-y divide-gray-100 dark:divide-secondary-700">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDark ? (
                <Moon className="text-gray-600 dark:text-gray-300" size={20} />
              ) : (
                <Sun className="text-gray-600 dark:text-gray-300" size={20} />
              )}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.theme.title')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isDark ? t('settings.theme.dark') : t('settings.theme.light')}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isDark ? 'bg-primary-600' : 'bg-gray-400'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  isDark ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Palette className="text-gray-600 dark:text-gray-300" size={20} />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.primaryColor.title')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.primaryColor.subtitle')}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <ColorPicker
                label={t('settings.primaryColor.title')}
                value={colors.primary}
                onChange={(color) => setColors({ primary: color })}
              />
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="text-gray-600 dark:text-gray-300" size={20} />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.language.title')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <LanguageSelector />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('settings.about')}</h2>
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-gray-100 dark:border-secondary-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.version')}</p>
        </div>
      </section>
    </div>
  );
}

export default Settings;