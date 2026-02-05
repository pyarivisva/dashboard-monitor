import { createContext, useState, useEffect, useContext, useMemo } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  const theme = useMemo(() => ({
    bg: darkMode ? '#0f172a' : '#f8fafc',
    text: darkMode ? '#e2e8f0' : '#1e293b',
    subText: darkMode ? '#94a3b8' : '#64748b',
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    cardShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.05)',
    border: darkMode ? '#334155' : '#e2e8f0',
    barBg: darkMode ? '#334155' : '#e0f2fe',
    accent: '#3b82f6',
    navBg: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    // navBg: '#0f172a',
    alertBg: darkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2',
    alertText: darkMode ? '#fca5a5' : '#ef4444'
  }), [darkMode]);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = theme.bg;
  }, [darkMode, theme.bg]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);