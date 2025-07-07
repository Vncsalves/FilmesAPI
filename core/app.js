const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const rotaFilmes = require('../src/routes/filmes');
app.use('/filmes', rotaFilmes);

module.exports = app;
