const express = require('express');
const { ethers } = require('ethers');
const app = express();

// Gunakan port dari environment atau default ke 3000
const PORT = process.env.PORT || 3000;

const providers = [
    new ethers.JsonRpcProvider('https://eth.llamarpc.com'),
    new ethers.JsonRpcProvider('https://cloudflare-eth.com'),
    new ethers.JsonRpcProvider('https://rpc.ankr.com/eth')
];

app.get('/', (req, res) => {
    res.send('Tracker EVM Aktif!');
});

app.get('/api/balance/:address', async (req, res) => {
    const address = req.params.address;
    if (!ethers.isAddress(address)) {
        return res.status(400).json({ error: 'Invalid Address' });
    }

    for (const provider of providers) {
        try {
            const balance = await provider.getBalance(address);
            return res.json({ address: address, balance: ethers.formatEther(balance) });
        } catch (e) {
            continue;
        }
    }
    res.status(500).json({ error: 'Semua provider gagal mengambil data' });
});

// TAMBAHKAN BARIS INI: Agar aplikasi benar-benar "nyala" dan mendengarkan port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
