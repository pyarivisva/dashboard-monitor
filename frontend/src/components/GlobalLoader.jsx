import React from 'react';
import { useLoader } from '../context/LoaderContext';
import { useTheme } from '../context/ThemeContext';
import { Loader2 } from 'lucide-react';

const GlobalLoader = () => {
  const { isLoading } = useLoader();
  const { theme, darkMode } = useTheme();

  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999, // Pastikan di atas segalanya (bahkan di atas Navbar)
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      // Glassmorphism Effect
      background: darkMode ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.3s ease'
    }}>
      
      {/* Spinner Animation */}
      <div style={{ position: 'relative' }}>
        <Loader2 
          size={60} 
          color={theme.accent} 
          style={{ animation: 'spin 1s linear infinite' }} 
        />
      </div>

      <p style={{ 
        marginTop: '20px', 
        color: theme.text, 
        fontWeight: '600', 
        fontSize: '14px',
        letterSpacing: '1px',
        animation: 'pulse 1.5s infinite'
      }}>
        LOADING DATA...
      </p>

      {/* CSS Animation injection */}
      <style>{`
        @keyframes spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default GlobalLoader;