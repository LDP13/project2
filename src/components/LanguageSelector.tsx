import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/language';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  const { setLanguage } = useLanguageStore();
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLanguage(langCode);
  };

  return (
    <div className="relative group inline-block">
      <button
        type="button"
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Globe size={20} />
        <span className="text-sm">{currentLanguage.flag} {currentLanguage.name}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-gray-100 dark:border-secondary-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map(lang => (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-secondary-700 flex items-center gap-2 ${
              lang.code === i18n.language
                ? 'text-primary-600 dark:text-primary-400 font-medium'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelector;