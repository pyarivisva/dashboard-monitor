import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { WifiOff, Activity } from 'lucide-react';

// --- KOMPONEN BARIS STATISTIK (DIPERBAIKI: % di Samping Label) ---
const StatRow = ({ label, value, percent, maxVal, color = '#60a5fa' }) => {
  const { theme } = useTheme();
  const percentageBar = Math.min((Math.abs(value) / maxVal) * 100, 100);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '11px' }}>
      
      {/* BAGIAN KIRI: Label + Persentase */}
      <div style={{ flex: 1, color: theme.subText, display: 'flex', alignItems: 'center', gap: '5px' }}>
        {label}
        {percent && (
          <span style={{ 
            fontSize: '10px', 
            color: parseFloat(percent) >= 0 ? '#22c55e' : '#ef4444',
            fontWeight: 'bold',
            background: parseFloat(percent) >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            padding: '1px 4px',
            borderRadius: '4px'
          }}>
            {parseFloat(percent) >= 0 ? '+' : ''}{percent}%
          </span>
        )}
      </div>

      {/* BAGIAN KANAN: Nilai USD */}
      <div style={{ textAlign: 'right', fontWeight: 'bold', marginRight: '10px', color: theme.text }}>
        ${parseFloat(value).toLocaleString()}
      </div>

      {/* BAR CHART KECIL */}
      <div style={{ width: '50px', height: '6px', background: theme.barBg, borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${percentageBar}%`, height: '100%', background: color, transition: 'width 0.5s ease' }}></div>
      </div>
    </div>
  );
};

// --- KOMPONEN HISTORY BULANAN ---
const MonthlyProfitRow = ({ month, profit, initial_depo }) => {
  const { theme } = useTheme();
  
  if (profit === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '11px' }}>
        <div style={{ color: theme.subText }}>{month}</div>
        <div style={{ color: theme.subText, fontStyle: 'italic', fontSize: '10px', opacity: 0.7 }}>Not yet actively trading</div>
      </div>
    );
  }

  const percentage = initial_depo > 0 ? ((profit / initial_depo) * 100).toFixed(1) : 0;
  const isPositive = profit >= 0;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '11px' }}>
      <div style={{ color: theme.subText }}>{month}</div>
      <div style={{ fontWeight: 'bold', color: isPositive ? '#22c55e' : '#ef4444' }}>
        ${parseFloat(profit).toLocaleString()} ({isPositive ? '+' : ''}{percentage}%)
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA KARTU ---
const DashboardCard = ({ akun }) => {
  const { theme, darkMode } = useTheme();

  return (
    <div style={{ 
      background: theme.cardBg, borderRadius: '16px', padding: '20px', boxShadow: theme.cardShadow, 
      transition: 'transform 0.3s ease, box-shadow 0.3s ease', position: 'relative', overflow: 'hidden',
      flex: '1 1 320px', maxWidth: '380px', minWidth: '300px', border: `1px solid ${theme.border}`
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = `0 15px 30px ${theme.accent}15`;
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.cardShadow;
    }}
    >
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ fontWeight: 'bold', color: theme.text, fontSize: '15px' }}>{akun.namaDisplay}</div>
            <span style={{ 
              fontSize: '8px', padding: '2px 6px', borderRadius: '4px', 
              background: akun.platform === 'MT5' ? '#8b5cf6' : '#22c55e', 
              color: 'white', fontWeight: '900', letterSpacing: '0.5px'
            }}>
              {akun.platform}
            </span>
          </div>
          <div style={{ fontSize: '10px', color: theme.subText, marginTop: '2px' }}>ID: {akun.id} | {akun.broker}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {akun.isConnected ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
               <span style={{ fontSize: '18px', fontWeight: '800', color: akun.growth >= 0 ? '#22c55e' : '#ef4444' }}>
                 {parseFloat(akun.growth).toFixed(1)}%
               </span>
               <span style={{ fontSize: '9px', color: theme.subText }}>Total Growth</span>
            </div>
          ) : (
            <div style={{ padding: '3px 6px', background: darkMode ? '#334155' : '#e2e8f0', color: theme.subText, borderRadius: '4px', fontSize: '9px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
               <WifiOff size={10} /> OFFLINE
            </div>
          )}
        </div>
      </div>

      {akun.isConnected ? (
        <>
          {/* FLOATING PROFIT BOX */}
          <div style={{ 
            textAlign: 'center', margin: '15px 0', padding: '10px', borderRadius: '8px',
            background: akun.floating >= 0 ? (darkMode ? 'rgba(34, 197, 94, 0.1)' : '#f0fdf4') : (darkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2'),
            border: `1px solid ${akun.floating >= 0 ? (darkMode ? 'rgba(34, 197, 94, 0.2)' : '#bbf7d0') : (darkMode ? 'rgba(239, 68, 68, 0.2)' : '#fecaca')}`
          }}>
            <div style={{ color: theme.subText, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
               <Activity size={12} /> Floating Profit
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: akun.floating >= 0 ? '#22c55e' : '#ef4444' }}>
              {akun.floating >= 0 ? '+' : ''} ${parseFloat(akun.floating).toLocaleString()}
              {/* TAMPILAN PERSEN FLOATING (Di Samping USD) */}
              <span style={{ fontSize: '12px', marginLeft: '6px', opacity: 0.8 }}>
                ({akun.floating >= 0 ? '+' : ''}{akun.floating_percent}%)
              </span>
            </div>
          </div>

          {/* RADAR CHART */}
          <div style={{ height: '260px', width: '100%', margin: '10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={akun.radarData}>
                <PolarGrid stroke={darkMode ? '#475569' : '#cbd5e1'} strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={({ payload, x, y, textAnchor }) => {
                    const dataPoint = akun.radarData.find(d => d.subject === payload.value);
                    return (
                      <g>
                        <text x={x} y={y} textAnchor={textAnchor} fontSize={9} fill={theme.subText}>
                          <tspan x={x} dy="-4">{payload.value}</tspan>
                          <tspan x={x} dy="12" fontWeight="bold" fill={theme.text}>
                            {dataPoint ? `${dataPoint.A.toFixed(1)}%` : '0%'}
                          </tspan>
                        </text>
                      </g>
                    );
                  }}
                />
                <PolarRadiusAxis angle={75} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 'bold' }} axisLine={false} tickFormatter={(t) => t === 100 ? '100+%' : `${t}%`} ticks={[0, 50, 100]} />
                <Radar dataKey="A" stroke={theme.accent} fill={theme.accent} fillOpacity={0.4} isAnimationActive={false} dot={{ r: 3, fill: theme.accent, fillOpacity: 1 }} style={{ outline: 'none' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* STATS BARS */}
          <div style={{ marginTop: '15px', borderTop: `1px solid ${theme.border}`, paddingTop: '15px' }}>
            <StatRow label="Total Profit" value={akun.profit_total} maxVal={akun.maxVal} color="#3b82f6" />
            
            {/* PROFIT MONTH (Persennya akan muncul di samping label "Profit This Month") */}
            <StatRow 
                label="Profit This Month" 
                value={akun.profit_current_month} 
                percent={akun.profit_current_month_percent} 
                maxVal={akun.maxVal} 
                color="#8b5cf6" 
            />
            
            <StatRow label="Equity" value={akun.equity} maxVal={akun.maxVal} color="#0ea5e9" />
            <StatRow label="Investment" value={akun.initial_deposit} maxVal={akun.maxVal} color="#94a3b8" />
            <StatRow label="Initial Deposit" value={akun.pure_initial_deposit} maxVal={akun.maxVal} color="#64748b" />
            <StatRow label="Withdrawals" value={akun.withdrawals} maxVal={akun.maxVal} color="#ef4444" />
            <StatRow label="Deposits" value={akun.top_up_only} maxVal={akun.maxVal} color="#22c55e" />
          </div>

          {/* HISTORY */}
          <div style={{ marginTop: '15px', padding: '12px', background: darkMode ? 'rgba(0,0,0,0.2)' : '#f1f5f9', borderRadius: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 'bold', color: theme.subText, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Performance History
            </div>
            {akun.monthly_history && akun.monthly_history.length > 0 ? (
              akun.monthly_history.map((m, i) => (
                <MonthlyProfitRow key={i} month={m.month} profit={m.profit} initial_depo={akun.initial_deposit} />
              ))
            ) : (
              <div style={{ fontSize: '10px', color: theme.subText }}>Loading history...</div>
            )}
          </div>
        </>
      ) : (
        <div style={{ marginTop: '20px', padding: '40px 10px', background: theme.alertBg, border: `1px dashed ${theme.alertText}`, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
          <h3 style={{ color: theme.alertText, margin: '0 0 5px 0', fontSize: '13px' }}>Connection Lost</h3>
          <p style={{ color: theme.subText, fontSize: '11px', margin: 0 }}>Waiting for bridge signal...</p>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;