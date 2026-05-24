const express = require('express');
const { ethers } = require('ethers');
const app = express();
const PORT = 3000;

const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth');

app.get('/', (req, res) => {
    res.send('Tracker EVM Aktif!');
});

app.get('/api/balance/:address', async (req, res) => {
    try {
        const balance = await provider.getBalance(req.params.address);
        res.json({ address: req.params.address, balance: ethers.formatEther(balance) });
    } catch (error) {
        res.status(500).json({ error: 'Invalid Address' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
