import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useCrypto();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
    </button>
  );
};

export default DarkModeToggle;
