const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.API_ACCESS_TOKEN}`
  }
});

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.status_message || 'Internal Server Error';
    throw { status, message };
  }
};

const handleParallelRequests = async (requests) => {
  try {
    const responses = await Promise.all(requests.map(request => handleRequest(request)));
    return responses;
  } catch (error) {
    throw error;
  }
};

module.exports = { apiClient, handleRequest, handleParallelRequests };