const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API rodando');
});

const rotaFilmes = require('../src/routes/filmes');
app.use('/filmes', rotaFilmes);

module.exports = app;
