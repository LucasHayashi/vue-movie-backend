const express = require('express');
const router = express.Router();
const { apiClient, handleParallelRequests } = require('../http/apiClient');

router.get('/:serie_id', async (req, res) => {
  const { serie_id } = req.params;
  const { session_id } = req.query;

  try {
    const baseTvUrl = `/tv/${serie_id}`;
    const requests = [
      apiClient.get(`${baseTvUrl}?language=pt-BR`),
      apiClient.get(`${baseTvUrl}/credits?language=pt-BR`),
      apiClient.get(`${baseTvUrl}/recommendations?language=pt-BR`),
      apiClient.get(`${baseTvUrl}/account_states?language=pt-BR`, { params: { session_id } })
    ];

    const [tvDetails, tvCredits, tvRecommendations, tvAccountStates] =
      await handleParallelRequests(requests);

    const sortedTvRecommendations = tvRecommendations.results.sort(
      (a, b) => b.popularity - a.popularity
    );

    const tv = {
      ...tvDetails,
      credits: tvCredits,
      recommendations: sortedTvRecommendations,
      account_states: tvAccountStates
    };

    res.status(200).json(tv);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

module.exports = router;