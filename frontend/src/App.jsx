import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LoaderProvider } from './context/LoaderContext';

// Components
import Navbar from './components/Navbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import GlobalLoader from './components/GlobalLoader';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import Copytrade from './pages/Copytrade';
import Request from './pages/Request';

// Placeholder Pages
const Video = () => <PagePlaceholder title="Video Gallery" />;

// Placeholder Component
const PagePlaceholder = ({ title }) => {
  const { theme } = useTheme();
  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      paddingTop: '80px', color: theme.text 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>{title}</h1>
        <p style={{ color: theme.subText }}>This page is under construction.</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <Router>
          <AppContent />
        </Router>
      </LoaderProvider>
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ background: theme.bg, minHeight: '100vh', transition: 'background 0.3s ease' }}>
      <Navbar />

      <FloatingWhatsApp />

      <GlobalLoader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/copytrade" element={<Copytrade />} />
        <Route path="/video" element={<Video />} />
        <Route path="/request" element={<Request />} />
      </Routes>
    </div>
  );
};

export default App;