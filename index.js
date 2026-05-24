const express = require('express');
const { ethers } = require('ethers');
const app = express();

// Railway biasanya memberikan port lewat process.env.PORT, jika tidak ada pakai 8080
const PORT = process.env.PORT || 8080;

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

// PENTING: Gunakan '0.0.0.0' agar bisa diakses publik
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
