const express = require('express');
const router = express.Router();
const { apiClient, handleRequest } = require('../http/apiClient');

const fetchUserList = async (listType, query) => {
  const { session_id, page = 1, type = 'movies' } = query;
  return handleRequest(
    apiClient.get(`/account/null/${listType}/${type}`, {
      params: { language: 'pt-BR', page, session_id }
    })
  );
};

router.get('/', async (req, res) => {
  try {
    const data = await handleRequest(apiClient.get('/account', { params: req.query }));
    res.json(data);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

router.post('/add_to', async (req, res) => {
  const { session_id } = req.query;
  const { media_type, media_id, type } = req.body;
  try {
    const data = await handleRequest(
      apiClient.post(`/account/null/${type}`,
        { media_type, media_id, [type]: req.body[type] },
        { params: { session_id } }
      )
    );
    res.json(data);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

router.get('/watchlist', async (req, res) => {
  try {
    const data = await fetchUserList('watchlist', req.query);
    res.json(data);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

router.get('/favorite', async (req, res) => {
  try {
    const data = await fetchUserList('favorite', req.query);
    res.json(data);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

module.exports = router;