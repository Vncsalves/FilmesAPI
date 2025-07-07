const express = require('express');
const router = express.Router();
const buscarFilmes = require('../controllers/filmes-controller');

router.get('/', buscarFilmes);

module.exports = router;
