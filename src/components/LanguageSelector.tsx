import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/language';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  const { setLanguage } = useLanguageStore();

  const handleLanguageChange = () => {
    const nextLanguage = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(nextLanguage);
    setLanguage(nextLanguage);
  };

  return (
    <button
      onClick={handleLanguageChange}
      className="text-primary-600 dark:text-primary-400 text-sm font-medium"
    >
      {languages.find(lang => lang.code === i18n.language)?.name}
    </button>
  );
}

export default LanguageSelector;