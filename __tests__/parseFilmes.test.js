const Filme = require("../src/models/parseFilmes");

test("deve criar um filme e formatar os dados corretamente", () => {
  const filmeBruto = {
    titulo: "Filme de Teste",
    ano: 2025,
    diretor: "Eu Mesmo",
    duracao: 120,
    orcamento: "$10 milhões",
    bilheteria: "$100 milhões",
    notas: [{ valor: 8.5, fonte: "IMDb" }],
    sinopse: [{ texto: "Uma sinopse de teste.", idioma: "pt-br" }],
    premios: [{ nome: "Oscar de Melhor Teste", relevancia: 10 }],
  };

  const filmeTratado = new Filme(filmeBruto);

  expect(filmeTratado.lucro).toBe("$90.000.000");
  expect(filmeTratado.duracaoSegundos).toBe(7200);
  expect(filmeTratado.notaIMDb).toBe("8.5");
});
