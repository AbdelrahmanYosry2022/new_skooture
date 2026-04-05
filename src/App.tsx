import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function ThemeUpdater() {
  const location = useLocation();
  const { theme, adminTheme } = useTheme();

  useEffect(() => {
    const isDashboard = location.pathname.startsWith('/admin');
    const currentTheme = isDashboard ? adminTheme : theme;

    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [location.pathname, theme, adminTheme]);

  return null;
}

function RTLUpdater() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Sync document direction with i18n language globally
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.body.dir = dir;
    
    // Add specific classes for layout engines that need it
    if (dir === 'rtl') {
      document.body.classList.add('rtl', 'font-arabic');
    } else {
      document.body.classList.remove('rtl', 'font-arabic');
    }
  }, [i18n.language]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Router>
          <ThemeUpdater />
          <RTLUpdater />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ContentProvider>
    </ThemeProvider>
  );
}
