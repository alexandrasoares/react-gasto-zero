import React, { useState, useEffect } from 'react';
import i18n from '../i18n/config';

const LanguageSelector: React.FC = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const languages = [
    { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
    { code: 'en-US', label: 'English', flag: '🇺🇸' },
    { code: 'es-ES', label: 'Español', flag: '🇪🇸' },
  ];

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };

  return (
    <div className="relative">
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer shadow-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
