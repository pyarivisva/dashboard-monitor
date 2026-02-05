import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, Activity, Calendar, AlertTriangle } from 'lucide-react';

const ProductCard = ({ product, onOverview, onBuy }) => {
  const { theme, darkMode } = useTheme();

  // Logic Warna Badge (MT5 = Ungu, MT4 = Hijau)
  const isMt5 = product.platform === 'MT5';

  return (
    <div style={{
      background: theme.cardBg,
      borderRadius: '20px',
      border: `1px solid ${theme.border}`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      position: 'relative',
      boxShadow: theme.cardShadow
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.borderColor = theme.accent;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = theme.border;
    }}
    >
      {/* HEADER GAMBAR (DISESUAIKAN UNTUK PORTRAIT) */}
      <div style={{ 
        position: 'relative', 
        height: '350px', // Dipertinggi agar muat gambar portrait
        overflow: 'hidden', 
        background: darkMode 
          ? 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)' // Gradient gelap elegan
          : 'radial-gradient(circle at center, #f1f5f9 0%, #e2e8f0 100%)', // Gradient terang
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px' // Memberi jarak agar gambar tidak mepet pinggir
      }}>
        
        {/* BADGE PLATFORM */}
        <div style={{
          position: 'absolute', top: '15px', right: '15px', zIndex: 10,
          background: isMt5 ? '#8b5cf6' : '#22c55e', 
          color: 'white', padding: '4px 10px', borderRadius: '8px',
          fontWeight: '900', fontSize: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          letterSpacing: '0.5px'
        }}>
          {product.platform}
        </div>

        {/* GAMBAR PRODUK */}
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', // KUNCI: Agar gambar utuh (tidak terpotong)
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', // Bayangan agar gambar "pop-up"
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)'} 
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
        />
        
      </div>

      {/* KONTEN */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: theme.text }}>{product.name}</h2>
          <p style={{ margin: '5px 0 0', fontSize: '12px', color: theme.accent, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.subtitle}</p>
        </div>

        {/* GRID STATISTIK */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px',
          background: darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', padding: '15px', borderRadius: '15px',
          border: `1px solid ${theme.border}`
        }}>
          <StatItem icon={<Calendar size={14} />} label="Daytest" value={product.stats.daytest} theme={theme} />
          <StatItem icon={<TrendingUp size={14} />} label="Growth" value={product.stats.growth} color="#22c55e" theme={theme} />
          <StatItem icon={<AlertTriangle size={14} />} label="Drawdown" value={product.stats.drawdown} color="#ef4444" theme={theme} />
          <StatItem icon={<Activity size={14} />} label="Est. Monthly" value={product.stats.estMonthly} color="#3b82f6" theme={theme} />
        </div>

        {/* PRICING SECTION */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px', borderBottom: `1px dashed ${theme.border}`, paddingBottom: '10px' }}>
            <span style={{ color: theme.subText }}>Single License</span>
            <span style={{ fontWeight: 'bold', color: theme.text }}>${product.price.single}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '13px' }}>
            <span style={{ color: theme.subText }}>Unlimited License</span>
            <span style={{ fontWeight: 'bold', color: theme.text }}>${product.price.unlimited}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => onOverview(product)}
              style={{ 
                flex: 1, padding: '12px', borderRadius: '12px', border: `1px solid ${theme.border}`,
                background: 'transparent', color: theme.text, fontWeight: 'bold', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.1)' : '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Overview
            </button>
            <button 
              onClick={() => onBuy(product)}
              style={{ 
                flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
                background: theme.accent, color: 'white', fontWeight: 'bold', cursor: 'pointer',
                boxShadow: `0 4px 15px ${theme.accent}40`,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, color, theme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: theme.subText, fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {icon} {label}
    </div>
    <div style={{ fontWeight: '800', color: color || theme.text, fontSize: '16px' }}>{value}</div>
  </div>
);

export default ProductCard;