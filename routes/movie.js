const express = require("express");
const router = express.Router();
const { apiClient, handleParallelRequests } = require("../http/apiClient");

router.get("/:movie_id", async (req, res) => {
  const { movie_id } = req.params;
  const { session_id } = req.query;

  try {
    const baseMovieUrl = `/movie/${movie_id}`;
    const requests = [
      apiClient.get(`${baseMovieUrl}?language=pt-BR`),
      apiClient.get(`${baseMovieUrl}/credits?language=pt-BR`),
      apiClient.get(`${baseMovieUrl}/recommendations?language=pt-BR`),
      apiClient.get(`${baseMovieUrl}/account_states?language=pt-BR`, {
        params: { session_id },
      }),
    ];

    const [
      movieDetails,
      movieCredits,
      movieRecommendations,
      movieAccountStates,
    ] = await handleParallelRequests(requests);

    const sortedMoviesRecommendations = movieRecommendations.results.sort(
      (a, b) => b.popularity - a.popularity
    );

    const movie = {
      ...movieDetails,
      credits: movieCredits,
      recommendations: sortedMoviesRecommendations,
      account_states: movieAccountStates,
    };

    res.status(200).json(movie);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
