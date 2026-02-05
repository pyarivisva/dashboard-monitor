import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLoader } from '../context/LoaderContext';
import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp, BookOpen, Users, Cpu } from 'lucide-react';

const Home = () => {
  const { theme, darkMode } = useTheme();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, 800);
    return () => clearTimeout(timer);
  }, [showLoader, hideLoader]);

  const services = [
    { title: 'Expert Advisors', icon: <Cpu size={28} />, desc: 'Automated trading logic' },
    { title: 'Indicator', icon: <TrendingUp size={28} />, desc: 'Technical analysis tools' },
    { title: 'Copytrade', icon: <Users size={28} />, desc: 'Follow successful strategies' },
    { title: 'Personal Mentoring', icon: <BookOpen size={28} />, desc: 'One-on-one coaching' },
  ];

  const bgGridStyle = {
    backgroundImage: darkMode 
      ? `radial-gradient(${theme.subText} 1px, transparent 1px)` 
      : `radial-gradient(#cbd5e1 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', 
    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
    position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* ================= HERO SECTION ================= */}
      <section style={{ 
        position: 'relative',
        minHeight: '100vh',         
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',   
        padding: '0 20px', 
        paddingTop: '60px' 
      }}>
        
        <div style={bgGridStyle}></div>

        <div style={{ 
          position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1000px', width: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'
        }}>
          
          {/* PILL STATS */}
          <div style={{ 
            display: 'inline-flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: '10px', 
            padding: '6px 16px', 
            borderRadius: '20px',
            background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${theme.border}`, 
            color: theme.subText, 
            fontSize: '10px', 
            fontWeight: '600', 
            letterSpacing: '1px', 
            textTransform: 'uppercase',
            maxWidth: '100%' 
          }}>
            <span>Years of Trading Experience</span>
            <span style={{ color: theme.accent }}>•</span>
            <span>Tons of Researches</span>
          </div>

          {/* HEADLINE */}
          <h1 style={{ 
            fontSize: 'clamp(32px, 8vw, 72px)', 
            fontWeight: '900', 
            color: theme.text, 
            lineHeight: '1.1', 
            margin: 0, 
            letterSpacing: '-1px'
          }}>
            WE MAKE YOUR <br />
            <span style={{ 
              background: `linear-gradient(to right, ${theme.accent}, #8b5cf6)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              TRADING EASIER
            </span>
          </h1>

          {/* SUBTEXT (SUDAH DIPERKECIL UNTUK MOBILE) */}
          <p style={{ 
            // Dulu 14px, sekarang 12px untuk mobile. Max 16px untuk desktop.
            fontSize: 'clamp(12px, 3.5vw, 16px)', 
            color: theme.subText, 
            maxWidth: '450px', // Lebar max juga diperkecil sedikit agar text lebih padat
            margin: 0, 
            lineHeight: '1.6' 
          }}>
            Data-driven strategies for modern traders. Expert Advisors, Copytrading, and Mentorship backed by real statistics.
          </p>

          {/* BUTTON */}
          <Link to="/portfolio" style={{ 
            marginTop: '10px',
            padding: '14px 40px', background: theme.accent, color: 'white', fontWeight: 'bold', 
            borderRadius: '50px', textDecoration: 'none', transition: 'all 0.3s ease',
            boxShadow: `0 0 30px ${theme.accent}60`, display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 0 50px ${theme.accent}80`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 30px ${theme.accent}60`; }}
          >
            <TrendingUp size={20} />
            See Live Portfolio
          </Link>
        </div>

      </section>

      {/* ================= ECOSYSTEM SECTION ================= */}
      <section style={{ padding: '0px 20px 80px', position: 'relative', zIndex: 5, marginTop: '-50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
             <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: '800', color: theme.text }}>Our Ecosystem</h2>
             <p style={{ color: theme.subText, fontSize: '14px', marginTop: '5px' }}>Comprehensive tools for your trading journey</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {services.map((svc, idx) => (
              <div key={idx} style={{ 
                padding: '30px 20px',
                background: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '20px', border: `1px solid ${theme.border}`,
                textAlign: 'center', transition: 'all 0.3s ease', cursor: 'default'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-5px)'; 
                e.currentTarget.style.borderColor = theme.accent;
                e.currentTarget.style.background = theme.cardBg;
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.background = darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)';
              }}
              >
                <div style={{ 
                  width: '60px', height: '60px', margin: '0 auto 15px', borderRadius: '15px',
                  background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent}10)`, color: theme.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 10px 20px ${theme.accent}15`
                }}>
                  {svc.icon}
                </div>
                <h3 style={{ color: theme.text, fontSize: '16px', marginBottom: '5px', fontWeight: '700' }}>{svc.title}</h3>
                <p style={{ color: theme.subText, fontSize: '12px', lineHeight: '1.4' }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SUPPORTED BY ================= */}
      <section style={{ padding: '0 20px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ 
            background: darkMode ? 'linear-gradient(145deg, #1e293b, #0f172a)' : 'linear-gradient(145deg, #ffffff, #f1f5f9)',
            padding: '40px', borderRadius: '24px', 
            border: `1px solid ${theme.border}`,
            boxShadow: darkMode ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.05)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px'
          }}>
            
            <p style={{ color: theme.subText, fontSize: '11px', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              Supported By
            </p>

            <div style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px',
              flexWrap: 'wrap' 
            }}>
              <img 
                src="/exclusive-icon.png" 
                alt="Exclusive Icon" 
                style={{ width: '60px', height: 'auto', objectFit: 'contain' }} 
              />
              <div style={{ textAlign: 'left', lineHeight: '0.9' }}>
                <span style={{ fontSize: '32px', fontWeight: '900', color: theme.text, letterSpacing: '-1px', display: 'block' }}>Exclusive</span>
                <span style={{ fontSize: '32px', fontWeight: '900', color: theme.text, letterSpacing: '-1px', display: 'block' }}>Markets</span>
              </div>
            </div>

            <div style={{ width: '40px', height: '3px', background: theme.accent, borderRadius: '2px', opacity: 0.5 }}></div>

            <p style={{ color: theme.subText, maxWidth: '400px', fontSize: '14px' }}>
              Experience institutional-grade trading conditions. <br/> 
              <span style={{ color: theme.accent }}>Raw Spreads. Fast Execution.</span>
            </p>

            <a 
              href="https://www.exclusivemarketsid.com/register?ib=12214227" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                marginTop: '5px',
                padding: '12px 30px', background: 'transparent', 
                border: `2px solid ${theme.text}`, color: theme.text, 
                fontWeight: 'bold', borderRadius: '10px', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = theme.text; e.currentTarget.style.color = theme.bg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.text; }}
            >
              Open Trading Account <ExternalLink size={16} />
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;