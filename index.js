const express = require('express');
const { ethers } = require('ethers');
const app = express();
const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

// Tambahkan rute dasar ini agar tidak error 500
app.get('/', (req, res) => {
    res.send('EVM Tracker API is running! Gunakan /api/balance/ALAMAT_DOMPET untuk mengecek saldo.');
});

app.get('/api/balance/:address', async (req, res) => {
    try {
        const address = req.params.address;
        if (!ethers.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Address Format' });
        }
        const balance = await provider.getBalance(address);
        res.json({ address: address, balance: ethers.formatEther(balance) });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
});

module.exports = app;
