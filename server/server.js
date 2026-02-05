const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// const compression = require('compression'); // Matikan biar gak error 503
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(compression()); // Matikan

app.use(cors());
app.use(bodyParser.json());

// ==========================================
// 1. FRONTEND / STATIC FILES SETUP
// ==========================================
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log("PATH DIST:", distPath);

// Sajikan file React (CSS/JS/Gambar)
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, {
        maxAge: '1y',
        etag: false
    }));
}

// ==========================================
// 2. DATA & API ROUTES
// ==========================================
// Tempat penyimpanan data sementara (RAM)
let latestData = {
    mt4: {},
    mt5: {}
};

// API Terima Data (Logika dari Kode Pilihan Bapak)
app.post('/api/tick', (req, res) => {
    const data = req.body;
    
    // --- LOGIKA PEMISAH (SORTING) ---
    if (data.platform === 'MT5') {
        latestData.mt5[data.id] = data;
        // console.log(`🔵 Masuk data MT5 [${data.id}]`); // Uncomment kalau mau lihat log
    } else {
        latestData.mt4[data.id] = data;
        // console.log(`🟢 Masuk data MT4 [${data.id}]`); // Uncomment kalau mau lihat log
    }
    
    res.send("Data diterima");
});

// API Kirim Data ke Website
app.get('/api/dashboard', (req, res) => {
    res.json(latestData);
});

// ==========================================
// 3. PENYELAMAT REFRESH (Routing)
// ==========================================
// Menggunakan Regex /(.*)/ agar support Node.js versi 22 terbaru
app.get(/(.*)/, (req, res) => {
    
    // Cek fisik file index.html
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        // Tampilkan pesan error yang jelas jika file hilang
        res.status(404).send(`
            <div style="font-family: sans-serif; padding: 40px; text-align: center; border: 3px solid red;">
                <h1 style="color: red;">⚠️ DIAGNOSA: FILE TIDAK DITEMUKAN</h1>
                <p>Server jalan (Node 22 Compatible), tapi file index.html hilang.</p>
                <hr>
                <p>Mencari di: <strong>${indexPath}</strong></p>
                <hr>
                <p>Solusi: Upload folder <code>dist</code> ke dalam folder <code>monitor-server</code>.</p>
            </div>
        `);
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server jalan di Port ${PORT}`);
});