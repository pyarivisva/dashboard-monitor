import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, ExternalLink } from 'lucide-react';

const WidgetModal = ({ data, onClose }) => {
  const { theme, darkMode } = useTheme();

  if (!data) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        width: '100%', maxWidth: '900px', height: '80vh',
        background: theme.cardBg, borderRadius: '20px',
        border: `1px solid ${theme.border}`,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ 
          padding: '15px 25px', borderBottom: `1px solid ${theme.border}`, 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: darkMode ? '#1e293b' : '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ margin: 0, color: theme.text }}>{data.name}</h3>
            <span style={{ fontSize: '12px', color: theme.accent, background: `${theme.accent}20`, padding: '2px 8px', borderRadius: '4px' }}>
              Live Stats
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a 
              href={data.widgetUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', color: theme.subText, textDecoration: 'none', fontSize: '12px' }}
            >
              Open in new tab <ExternalLink size={14} />
            </a>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: theme.text, cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content Iframe */}
        <div style={{ flex: 1, background: 'white' }}> {/* Background putih karena widget biasanya base putih */}
          <iframe 
            src={data.widgetUrl}
            title={data.name}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </div>

      </div>
    </div>
  );
};

export default WidgetModal;