const express = require('express');
const { ethers } = require('ethers');
const app = express();

// Railway memberikan port lewat environment variable, default ke 8080 jika tidak ada
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
        } catch (e) { continue; }
    }
    res.status(500).json({ error: 'Semua provider gagal' });
});

// PENTING: Gunakan 0.0.0.0 agar aplikasi bisa diakses dari luar container
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
