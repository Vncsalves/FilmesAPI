require('dotenv').config(); 

module.exports = {
  port: process.env.PORT || 3000,
  urlMetadadosApi: process.env.API_METADADOS_URL
};