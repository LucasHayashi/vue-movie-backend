const express = require('express');
const router = express.Router();
const { apiClient, handleRequest } = require('../http/apiClient');
require('dotenv').config();

const REDIRECT_URL = process.env.AUTH_CALLBACK;

router.get('/start', async (req, res) => {
    try {
        const data = await handleRequest(apiClient.get('/authentication/token/new'));
        const { request_token } = data;
        const tbmdbAuthUrl = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${REDIRECT_URL}`;

        res.json({ auth_url: tbmdbAuthUrl });
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
});

router.get('/session', async (req, res) => {
    const { request_token } = req.query;

    try {
        const data = await handleRequest(apiClient.post('/authentication/session/new', { request_token }));
        const { session_id } = data;

        res.json({ session_id });
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
});

router.delete('/session', async (req, res) => {
    const { session_id } = req.query;

    try {
        await handleRequest(apiClient.delete('/authentication/session', { params: { session_id } }));
        res.json({ success: true });
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
});


module.exports = router;