import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ExternalLink, BarChart2 } from 'lucide-react';

const CopytradeCard = ({ data, onClick }) => {
  const { theme, darkMode } = useTheme();

  return (
    <div 
      onClick={() => onClick(data)}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: theme.cardShadow,
        width: '100%',         
        boxSizing: 'border-box',
        maxWidth: '500px',     
        margin: '0 auto'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = theme.accent;
        e.currentTarget.style.boxShadow = `0 10px 25px ${theme.accent}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.boxShadow = theme.cardShadow;
      }}
    >
      {/* Background decoration*/}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '100px', height: '100%',
        background: `linear-gradient(90deg, transparent, ${theme.accent}05)`,
        skewX: '-20deg'
      }}></div>

      {/* Bagian Kiri: Gambar & Rank */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '100px', height: '110px', borderRadius: '12px', overflow: 'hidden',
          border: `2px solid ${theme.border}`, 
          // FIX: Gunakan darkMode untuk background container gambar
          background: darkMode ? '#0f172a' : '#f1f5f9' 
        }}>
          <img 
            src={data.image} 
            alt={data.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            // Fallback: Jika gambar error/tidak ketemu, sembunyikan img dan munculkan div icon
            onError={(e) => {
              e.target.style.display = 'none'; 
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          
          {/* Fallback Icon (Muncul jika gambar rusak) */}
          <div style={{ 
            display: 'none', // Default hidden
            width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', 
            background: darkMode ? '#1e293b' : '#cbd5e1' 
          }}>
            <BarChart2 color={darkMode ? "white" : "#64748b"} />
          </div>
        </div>

        {/* Badge Ranking */}
        <div style={{
          position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)',
          background: theme.accent, color: 'white', fontSize: '10px', fontWeight: 'bold',
          padding: '2px 8px', borderRadius: '10px', whiteSpace: 'nowrap',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          {data.rank}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold', color: theme.text }}>
          {data.name}
        </h3>
        <p style={{ margin: 0, fontSize: '12px', color: theme.subText }}>
          {data.desc}
        </p>
        
        <div style={{ 
          marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px',
          fontSize: '12px', color: theme.accent, fontWeight: '600'
        }}>
          View Performance <ExternalLink size={12} />
        </div>
      </div>

    </div>
  );
};

export default CopytradeCard;