const Filme = require("../models/parseFilmes");
const { buscarMetadados } = require('../services/metadadosService');

module.exports = async function buscarFilmes(req, res) {
  try {
    const filmesBrutos = await buscarMetadados();

    const filmesParseados = filmesBrutos.map((filmeBruto) =>
      new Filme(filmeBruto).toJSON()
    );

    res.json(filmesParseados);
  } catch (erro) {
    console.error("Erro completo:", erro);
    res.status(500).json({
      mensagem: erro.message || 'Erro interno no servidor.',
    });
  }
};