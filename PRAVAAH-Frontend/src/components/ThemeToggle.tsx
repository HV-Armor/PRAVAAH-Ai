'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md border transition-all flex items-center justify-center
        ${isDark 
          ? 'bg-pravaah-card text-pravaah-cyan border-pravaah-outline hover:border-pravaah-teal' 
          : 'bg-pravaah-surface text-pravaah-primary border-pravaah-outline hover:border-pravaah-teal'
        }
      `}
      aria-label="Toggle Theme"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      {isDark ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  );
}
