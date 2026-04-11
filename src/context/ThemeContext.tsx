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
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [adminTheme, setAdminThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('admin_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Admin dashboard targets dark by default
  });

  // Use location pathname strictly inside useEffect since ThemeProvider wraps the Router in App.tsx
  // We'll attach a mutation observer or rely on context to update the HTML tag safely.
  useEffect(() => {
    const isDashboard = window.location.pathname.startsWith('/admin');
    const currentTheme = isDashboard ? adminTheme : theme;

    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('admin_theme', adminTheme);
  }, [theme, adminTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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
