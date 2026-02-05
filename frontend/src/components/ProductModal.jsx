import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Check, FileText, ShoppingCart } from 'lucide-react'; // Tambah icon ShoppingCart

const ProductModal = ({ product, onClose }) => {
  const { theme, darkMode } = useTheme();

  if (!product) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        width: '100%', 
        maxWidth: '500px',
        maxHeight: '90vh', 
        display: 'flex', flexDirection: 'column',
        background: theme.cardBg, borderRadius: '24px',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        position: 'relative', overflow: 'hidden',
        animation: 'fadeIn 0.3s ease-out' // Animasi muncul
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ padding: '25px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px', color: theme.text }}>{product.name}</h2>
            <span style={{ fontSize: '14px', color: theme.accent }}>{product.subtitle}</span>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'transparent', border: 'none', color: theme.subText, cursor: 'pointer',
              transition: 'transform 0.2s', padding: '5px' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Scrollable */}
        <div style={{ padding: '25px', overflowY: 'auto', flex: 1 }}>
          <p style={{ color: theme.subText, lineHeight: '1.6', marginBottom: '25px' }}>
            {product.desc}
          </p>

          <h4 style={{ color: theme.text, marginBottom: '15px' }}>Key Features</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {product.features.map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: theme.text }}>
                <div style={{ background: `${theme.accent}20`, padding: '5px', borderRadius: '50%', color: theme.accent, flexShrink: 0 }}>
                  <Check size={14} />
                </div>
                <span style={{ fontSize: '14px' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ 
          padding: '20px', 
          background: darkMode ? 'rgba(0,0,0,0.2)' : '#f8fafc', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '10px', 
          flexShrink: 0,
          flexWrap: 'wrap'
        }}>
          
          {/* TOMBOL PDF (Hover Effect: Isi Warna Accent) */}
          {product.pdf && (
            <a 
              href={product.pdf}
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                padding: '10px 20px', borderRadius: '10px', 
                border: `1px solid ${theme.accent}`, 
                background: 'transparent', 
                color: theme.accent, 
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '8px',
                fontWeight: 'bold', fontSize: '14px',
                transition: 'all 0.3s ease', // Smooth Transition
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.accent;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = theme.accent;
              }}
            >
              <FileText size={16} /> Read PDF Guide
            </a>
          )}

          {/* TOMBOL BUY (Hover Effect: Membesar + Shadow) */}
          <a 
            href={`https://wa.me/+6282322882185?text=Hello, I am interested in ${product.name} (${product.platform})`}
            target="_blank" rel="noopener noreferrer"
            style={{ 
              padding: '10px 30px', borderRadius: '10px', border: 'none', 
              background: theme.accent, color: 'white', fontWeight: 'bold', 
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '14px',
              transition: 'all 0.3s ease', // Smooth Transition
              cursor: 'pointer',
              boxShadow: `0 4px 10px ${theme.accent}40`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 8px 20px ${theme.accent}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 4px 10px ${theme.accent}40`;
            }}
          >
            <ShoppingCart size={16} /> Buy License
          </a>
        </div>

      </div>
      
      {/* Animasi CSS agar modal munculnya enak */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ProductModal;