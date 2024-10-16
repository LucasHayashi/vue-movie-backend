const express = require('express');
const router = express.Router();
const { apiClient, handleRequest } = require('../http/apiClient');
require('dotenv').config();

router.get('/', async (req, res) => {
    const query = req.query.q;
    const url = `/search/multi?query=${query}&language=pt-BR`;

    try {
        const data = await handleRequest(apiClient.get(url));
        res.json(data);
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
});

router.get('/movie', async (req, res) => {
    const query = req.query.q;
    const url = `/search/movie?query=${query}&language=pt-BR`;

    try {
        const data = await handleRequest(apiClient.get(url));
        res.json(data);
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
});

router.get('/tv', async (req, res) => {
    const query = req.query.q;
    const url = `/search/tv?query=${query}&language=pt-BR`;

    try {
        const data = await handleRequest(apiClient.get(url));
        res.json(data);
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
});

router.get('/person', async (req, res) => {
    const query = req.query.q;
    const url = `/search/person?query=${query}&language=pt-BR`;

    try {
        const data = await handleRequest(apiClient.get(url));
        res.json(data);
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
});

module.exports = router;