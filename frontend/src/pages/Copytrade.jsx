import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLoader } from '../context/LoaderContext';
import { copytrades } from '../data/copytrades';
import CopytradeCard from '../components/CopytradeCard';
import WidgetModal from '../components/WidgetModal';

const Copytrade = () => {
  const { theme } = useTheme();
  const { showLoader, hideLoader } = useLoader();
  const [selectedItem, setSelectedItem] = useState(null);

  // Fake loading effect
  useEffect(() => {
    showLoader();
    setTimeout(() => hideLoader(), 800);
  }, [showLoader, hideLoader]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px', padding: '0 20px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: theme.text, marginBottom: '10px' }}>
          Social <span style={{ color: theme.accent }}>Copytrade</span>
        </h1>
        <p style={{ color: theme.subText, maxWidth: '600px', margin: '0 auto' }}>
          Follow the strategies of our master traders. 
          Real-time performance tracked and verified by Exclusive Markets.
        </p>
      </div>

      {/* Grid Layout (2 Kolom sesuai referensi gambar) */}
      <div style={{ 
        maxWidth: '900px', margin: '0 auto', padding: '0 20px',
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        justifyContent: 'center',
        gap: '20px'
      }}>
        {copytrades.map((item) => (
          <CopytradeCard 
            key={item.id} 
            data={item} 
            onClick={setSelectedItem} // Buka Modal
          />
        ))}
      </div>

      {/* Modal Iframe */}
      <WidgetModal 
        data={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

    </div>
  );
};

export default Copytrade;