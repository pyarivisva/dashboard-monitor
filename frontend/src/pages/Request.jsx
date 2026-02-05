import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLoader } from '../context/LoaderContext';
import { Send, Copy, Check, AlertCircle, Mail } from 'lucide-react'; // Tambah icon Mail

const Request = () => {
  const { theme, darkMode } = useTheme();
  const { showLoader, hideLoader } = useLoader();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: 'EA', 
    whatsapp: '',
    detail: ''
  });

  const [copied, setCopied] = useState(false);
  const walletAddress = "TAXBZKAIR15G6sY9hSj7Hg6TMDatGxbhYP";

  useEffect(() => {
    showLoader();
    setTimeout(() => hideLoader(), 800);
  }, [showLoader, hideLoader]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `
*NEW REQUEST FROM WEBSITE*
---------------------------
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
🛠 *Request:* ${formData.requestType}
📱 *WhatsApp:* ${formData.whatsapp}
---------------------------
📝 *Detail:* ${formData.detail}
    `.trim();

    const adminPhone = "+6282322882185"; 
    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper Style Input (Diperbaiki agar tidak nabrak)
  const inputStyle = {
    background: theme.bg,
    border: `1px solid ${theme.border}`,
    color: theme.text,
    padding: '12px',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box', // KUNCI AGAR TIDAK NABRAK
    marginBottom: '5px'      // Sedikit jarak bawah
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: theme.text, marginBottom: '10px' }}>
          Request <span style={{ color: theme.accent }}>Feature</span>
        </h1>
        <p style={{ color: theme.subText }}>
          Need a custom EA, Indicator, or private mentoring? Fill the form below.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* === FORM SECTION === */}
        <div style={{ 
          background: theme.cardBg, borderRadius: '20px', border: `1px solid ${theme.border}`,
          padding: '30px', boxShadow: theme.cardShadow, marginBottom: '40px'
        }}>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Row 1: Name & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: theme.subText, fontSize: '12px', fontWeight: 'bold' }}>NAME :</label>
                <input 
                  type="text" name="name" required
                  placeholder="Your Name"
                  value={formData.name} onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: theme.subText, fontSize: '12px', fontWeight: 'bold' }}>EMAIL :</label>
                <input 
                  type="email" name="email" required
                  placeholder="your@email.com"
                  value={formData.email} onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Row 2: Request Type & WA */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: theme.subText, fontSize: '12px', fontWeight: 'bold' }}>REQUEST :</label>
                <select 
                  name="requestType" 
                  value={formData.requestType} onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="EA">Expert Advisor (EA)</option>
                  <option value="INDICATOR">Indicator</option>
                  <option value="MENTORING">Private Mentoring</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: theme.subText, fontSize: '12px', fontWeight: 'bold' }}>WHATSAPP :</label>
                <input 
                  type="text" name="whatsapp" required
                  placeholder="+62..."
                  value={formData.whatsapp} onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Row 3: Detail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: theme.subText, fontSize: '12px', fontWeight: 'bold' }}>DETAIL :</label>
              <textarea 
                name="detail" rows="5" required
                placeholder="Describe your request in detail..."
                value={formData.detail} onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* ACTIONS: SEND WA & EMAIL BUTTON */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
              
              {/* TOMBOL UTAMA: KIRIM WA */}
              <button 
                type="submit"
                style={{ 
                  padding: '15px', borderRadius: '10px', border: 'none',
                  background: theme.accent, color: 'white', fontWeight: 'bold', fontSize: '16px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  transition: 'all 0.2s', boxShadow: `0 4px 15px ${theme.accent}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accent}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}40`;
                }}
              >
                <Send size={18} /> Send Request via WhatsApp
              </button>

              {/* TOMBOL EMAIL SUPPORT (Ganti Text Biasa Jadi Tombol Outline) */}
              <a 
                href="mailto:zigmavoid@gmail.com"
                style={{ 
                  padding: '12px', borderRadius: '10px', 
                  border: `1px solid ${theme.border}`,
                  background: 'transparent', color: theme.subText, 
                  fontWeight: '600', fontSize: '13px', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                  e.currentTarget.style.color = theme.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = theme.subText;
                }}
              >
                <Mail size={16} /> Contact Support: zigmavoid@gmail.com
              </a>

            </div>

          </form>
        </div>

        {/* === PAYMENT SECTION === */}
        <div style={{ 
          background: darkMode ? '#0f172a' : '#f8fafc',
          borderRadius: '20px', border: `1px solid ${theme.border}`,
          padding: '30px', textAlign: 'center'
        }}>
          <h3 style={{ color: theme.text, marginBottom: '10px' }}>Payment Information</h3>
          <p style={{ color: theme.accent, fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}>
            NETWORK: TRON (TRC20)
          </p>

          <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
            maxWidth: '500px', margin: '0 auto'
          }}>
            {/* Wallet Address Box */}
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', 
              background: theme.cardBg, padding: '10px 15px', borderRadius: '10px',
              border: `1px dashed ${theme.border}`, width: '100%', justifyContent: 'space-between',
              boxSizing: 'border-box' // Pastikan tidak nabrak juga
            }}>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme.text, fontSize: '13px', fontFamily: 'monospace' }}>
                {walletAddress}
              </div>
              <button 
                onClick={handleCopy}
                style={{ 
                  background: copied ? '#22c55e' : theme.bg, border: `1px solid ${theme.border}`, 
                  color: copied ? 'white' : theme.text, padding: '8px', borderRadius: '8px', cursor: 'pointer',
                  transition: 'all 0.2s', flexShrink: 0
                }}
                title="Copy Address"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* QR Code Container */}
            <div style={{ 
              background: 'white', padding: '15px', borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="/qr-payment.png" 
                alt="USDT QR Code" 
                style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }} 
              />
              <div style={{ display: 'none', width: '200px', height: '200px', color: 'black', textAlign: 'center', lineHeight: '200px', border: '1px dashed gray' }}>
                QR Image Not Found
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.subText, fontSize: '12px' }}>
               <AlertCircle size={14} color={theme.accent} />
               <span>Please ensure you select the <b>TRC20</b> network.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Request;