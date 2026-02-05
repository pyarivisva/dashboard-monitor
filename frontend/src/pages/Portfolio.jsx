import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { DATA_MASTER } from '../data/accounts';
import DashboardCard from '../components/DashboardCard';
import { useLoader } from '../context/LoaderContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://katonfx.com/api/dashboard'; // Pastikan URL ini benar

const Portfolio = () => {
  const { theme } = useTheme();
  const { showLoader, hideLoader } = useLoader();
  
  // State awal kita buat aman dengan objek kosong
  const [realData, setRealData] = useState({ mt4: {}, mt5: {} });

  useEffect(() => {
    const fetchData = async (isFirstLoad = false) => {
      if (isFirstLoad) showLoader();
      try {
        const res = await axios.get(API_URL);
        // Validasi: Pastikan data yg diterima benar-benar objek
        if(res.data && (res.data.mt4 || res.data.mt5)) {
            setRealData(res.data);
        }
      } catch (err) {
        console.error("Gagal konek server:", API_URL, err);
      } finally {
        if (isFirstLoad) setTimeout(() => hideLoader(), 500);
      }
    };
    
    fetchData(true); 
    const interval = setInterval(() => fetchData(false), 2000);
    return () => clearInterval(interval);
  }, [showLoader, hideLoader]);

  const allAccounts = Object.keys(DATA_MASTER).map(id => {
    const master = DATA_MASTER[id];

    // --- PERBAIKAN UTAMA DI SINI (ANTI CRASH) ---
    // Kita gunakan tanda tanya (?.) agar kalau datanya belum ada, dia tidak error/crash
    const mt4List = realData?.mt4 || {}; // Kalau undefined, ganti jadi {}
    const mt5List = realData?.mt5 || {}; // Kalau undefined, ganti jadi {}

    // Coba cari data di berbagai kemungkinan key
    const dataServer = mt4List[id] || mt5List[id] || mt5List[Number(id)] || mt5List[String(id)];
    
    // --- KONVERSI DATA (Paksa jadi Number agar aman) ---
    const equity = Number(dataServer?.equity || 0);
    const floating = Number(dataServer?.floating || 0);
    const initial_deposit = Number(dataServer?.initial_deposit || 0);
    const profit_month = Number(dataServer?.profit_current_month || 0);
    
    const balance = equity - floating;
    const floating_percent = balance > 0 
        ? ((floating / balance) * 100).toFixed(2) 
        : "0.00";

    const profit_month_percent = initial_deposit > 0 
        ? ((profit_month / initial_deposit) * 100).toFixed(2) 
        : "0.00";

    const vals = [equity, Number(dataServer?.profit_total || 0), initial_deposit, Number(dataServer?.withdrawals || 0)];
    const maxVal = Math.max(...vals, 1);

    return {
      id: id,
      namaDisplay: master.nama || 'Unknown Account',
      broker: master.broker || 'Broker Info',
      // Deteksi platform: Kalau ketemu di mt4List berarti MT4, kalau tidak berarti MT5
      platform: dataServer?.platform || (mt4List[id] ? "MT4" : "MT5"),
      isConnected: !!dataServer,
      growth: Number(dataServer?.growth || 0),
      
      floating: floating,
      floating_percent: floating_percent,
      equity: equity,
      profit_total: Number(dataServer?.profit_total || 0),
      profit_current_month: profit_month,
      profit_current_month_percent: profit_month_percent,
      withdrawals: Number(dataServer?.withdrawals || 0),
      initial_deposit: initial_deposit,
      pure_initial_deposit: Number(dataServer?.pure_initial_deposit || 0),
      top_up_only: Number(dataServer?.top_up_only || 0),
      
      monthly_history: dataServer?.monthly_history || [], 
      maxVal: maxVal,
      
      radarData: [
        { subject: 'Win Rate', A: Number(dataServer?.win_rate || 0) },
        { subject: 'Loss Rate', A: Number(dataServer?.loss_rate || 0) },
        { subject: 'Activity', A: Number(dataServer?.activity || 0) },
        { subject: 'Max Load', A: 50 }, 
        { subject: 'Drawdown', A: 20 }, 
        { subject: 'Algo', A: Number(dataServer?.algo_ratio || 0) },
      ]
    };
  });

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: theme.text, fontSize: '42px', fontWeight: '900', marginBottom: '15px' }}>
            Live <span style={{ color: theme.accent }}>Portfolio</span>
          </h1>
          <p style={{ color: theme.subText, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Real-time performance monitoring of our algorithmic trading strategies. 
            Verified data directly from MetaTrader terminals.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
          gap: '30px', 
          alignItems: 'start' 
        }}>
          {allAccounts.map(akun => <DashboardCard key={akun.id} akun={akun} />)}
        </div>

      </div>
    </div>
  );
};

export default Portfolio;