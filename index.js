const express = require('express');
const { ethers } = require('ethers');
const app = express();

// Daftar provider cadangan
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

    // Mencoba provider satu per satu
    for (const provider of providers) {
        try {
            const balance = await provider.getBalance(address);
            return res.json({ address: address, balance: ethers.formatEther(balance) });
        } catch (e) {
            continue; // Coba provider berikutnya jika gagal
        }
    }
    res.status(500).json({ error: 'Semua provider gagal mengambil data' });
});

module.exports = app;
