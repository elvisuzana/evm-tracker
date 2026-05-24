const express = require('express');
const { ethers } = require('ethers');
const app = express();

// Menggunakan provider dari Alchemy (lebih stabil untuk Vercel)
const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/demo');

app.get('/', (req, res) => {
    res.send('API is running!');
});

app.get('/api/balance/:address', async (req, res) => {
    try {
        const address = req.params.address;
        if (!ethers.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Address' });
        }
        
        // Cek koneksi ke provider
        const balance = await provider.getBalance(address);
        res.json({ address: address, balance: ethers.formatEther(balance) });
    } catch (error) {
        // Kirim detail error agar kita tahu masalahnya
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
