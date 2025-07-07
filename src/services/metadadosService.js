const axios = require('axios');
const config = require('../config/config');

async function buscarMetadados() {
  try {
    const response = await axios.get(config.urlMetadadosApi);
    return response.data.filmes || [];
  } catch (error) {
    throw new Error('Erro ao buscar metadados');
  }
}

module.exports = { buscarMetadados };