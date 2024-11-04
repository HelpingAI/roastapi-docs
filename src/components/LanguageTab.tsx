import React from 'react';

interface LanguageTabProps {
  language: string;
  active: boolean;
  onClick: () => void;
  isDark: boolean;
}

export const LanguageTab: React.FC<LanguageTabProps> = ({ language, active, onClick, isDark }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-purple-600 text-white'
          : `${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:bg-white/10`
      }`}
    >
      {language.charAt(0).toUpperCase() + language.slice(1)}
    </button>
  );
};