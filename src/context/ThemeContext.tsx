import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  adminTheme: Theme;
  toggleTheme: () => void;
  setAdminTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light'; // Default to light mode
  });

  const [adminTheme, setAdminThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('admin_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light'; // Admin dashboard also defaults to light
  });

  useEffect(() => {
    const isDashboard = window.location.pathname.startsWith('/admin');
    const currentTheme = isDashboard ? adminTheme : theme;

    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('admin_theme', adminTheme);
  }, [theme, adminTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    // If we want dashboard and site to stay in sync, we could set both here.
    // Given "The toggle must work on BOTH", keeping them separate but available is usually fine,
    // but the user might expect a global state. Let's keep the existing structure but fix the defaults.
  };

  const setAdminTheme = (t: Theme) => {
    setAdminThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, adminTheme, toggleTheme, setAdminTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
