const express = require('express');
const router = express.Router();
const { apiClient, handleParallelRequests } = require('../http/apiClient');

router.get('/:person_id', async (req, res) => {
  const { person_id } = req.params;

  try {
    const basePersonUrl = `/person/${person_id}`;
    const requests = [
      apiClient.get(`${basePersonUrl}?language=pt-BR`),
      apiClient.get(`${basePersonUrl}/combined_credits?language=pt-BR`)
    ];

    const [personDetails, personCredits] = await handleParallelRequests(requests);

    const person = {
      ...personDetails,
      combined_credits: personCredits
    };

    res.status(200).json(person);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || 'Internal Server Error'
    });
  }
});

module.exports = router;