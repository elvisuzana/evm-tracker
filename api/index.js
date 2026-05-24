const express = require('express');
const { ethers } = require('ethers');
const app = express();

const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth');

app.get('/api/balance/:address', async (req, res) => {
    try {
        const balance = await provider.getBalance(req.params.address);
        res.json({ address: req.params.address, balance: ethers.formatEther(balance) });
    } catch (error) {
        res.status(500).json({ error: 'Invalid Address' });
    }
});

module.exports = app;
