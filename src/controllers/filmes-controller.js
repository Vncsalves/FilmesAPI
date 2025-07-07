const axios = require('axios');

module.exports = async function buscarFilmes(req, res) {
  try {
    const response = await axios.get('https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/');
    res.json(response.data);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro na busca dos dados dos filmes',
      erro: erro.message
    });
  }     
}
