const express = require('express');
const router = express.Router();
const { apiClient, handleRequest } = require('../http/apiClient');
require('dotenv').config();

router.get('/all/:time_window?', async (req, res) => {
    const time_window = req.params.time_window || 'day';
    const page = req.query.page || 1;
    const url = `/trending/all/${time_window}?language=pt-BR&page=${page}`;

    try {
        const data = await handleRequest(apiClient.get(url));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.get('/movie/:time_window?', async (req, res) => {
    const time_window = req.params.time_window || 'day';
    const page = req.query.page || 1;
    const url = `/trending/movie/${time_window}?language=pt-BR&page=${page}`;

    try {
        const data = await handleRequest(apiClient.get(url));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.get('/tv/:time_window?', async (req, res) => {
    const time_window = req.params.time_window || 'day';
    const page = req.query.page || 1;
    const url = `/trending/tv/${time_window}?language=pt-BR&page=${page}`;

    try {
        const data = await handleRequest(apiClient.get(url));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.get('/person/:time_window?', async (req, res) => {
    const time_window = req.params.time_window || 'day';
    const page = req.query.page || 1;
    const url = `/trending/person/${time_window}?language=pt-BR&page=${page}`;

    try {
        const data = await handleRequest(apiClient.get(url));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;