import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { theme, darkMode, setDarkMode } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Shop', path: '/shop' },
    { name: 'Copytrade', path: '/copytrade' },
    { name: 'Video', path: '/video' },
    { name: 'Request', path: '/request' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80,
      background: theme.navBg, backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${theme.border}`, padding: '0 20px',
      transition: 'background 0.3s ease, border 0.3s ease'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* LOGO */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
           <img 
             src={darkMode ? "/katonfx-logo-dark.png" : "/katonfx-logo-light.png"} 
             
             alt="KatonFX Logo" 
             style={{ 
               width: 'auto',  
               height: '50px', 
               objectFit: 'contain',
               display: 'block',
               transition: 'opacity 0.3s ease'
             }} 
           />
        </Link>

        {/* DESKTOP MENU */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              style={{ 
                textDecoration: 'none', fontSize: '14px', fontWeight: '600',
                color: isActive(link.path) ? theme.accent : theme.subText,
                transition: 'color 0.2s'
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CONTROLS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: 'transparent', border: 'none', color: theme.text, cursor: 'pointer', display: 'flex' }}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* MOBILE TOGGLE */}
          <button 
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'transparent', border: 'none', color: theme.text, cursor: 'pointer', display: 'none' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{ 
          background: theme.bg, padding: '20px', borderBottom: `1px solid ${theme.border}`,
          display: 'flex', flexDirection: 'column', gap: '15px'
        }}>
          {links.map((link) => (
             <Link 
             key={link.name} 
             to={link.path}
             onClick={() => setIsOpen(false)}
             style={{ 
               textDecoration: 'none', fontSize: '16px', fontWeight: '600',
               color: isActive(link.path) ? theme.accent : theme.text,
               display: 'block'
             }}
           >
             {link.name}
           </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;