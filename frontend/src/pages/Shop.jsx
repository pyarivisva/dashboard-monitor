import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLoader } from '../context/LoaderContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const Shop = () => {
  const { theme } = useTheme();
  const { showLoader, hideLoader } = useLoader();
  const [selectedProduct, setSelectedProduct] = useState(null); // State Modal Kembali

  useEffect(() => {
    showLoader();
    setTimeout(() => hideLoader(), 800);
  }, [showLoader, hideLoader]);

  // Handler Tombol Buy (Langsung ke WA)
  const handleBuy = (product) => {
    const message = `Hello KatonFX, I want to purchase the license for *${product.name} (${product.platform})*. Please guide me.`;
    window.open(`https://wa.me/+6282322882185?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 20px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: theme.text, marginBottom: '15px' }}>
          Premium <span style={{ color: theme.accent }}>Tools</span>
        </h1>
        <p style={{ color: theme.subText, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Choose the best Expert Advisor that fits your trading style. 
          All tools are backed by statistical research and verified live performance.
        </p>
      </div>

      {/* GRID */}
      <div style={{ 
        maxWidth: '1200px', margin: '0 auto', padding: '0 20px',
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px'
      }}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onOverview={setSelectedProduct} // Buka Modal
            onBuy={handleBuy}
          />
        ))}
      </div>

      {/* MODAL */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

    </div>
  );
};

export default Shop;