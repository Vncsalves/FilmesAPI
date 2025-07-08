class Filme {
  constructor({
    titulo,
    diretor,
    ano,
    genero,
    duracao,
    notas,
    sinopse,
    orcamento,
    bilheteria,
    premios,
  }) {
    this.titulo = titulo;
    this.ano = ano;
    this.diretor = diretor;
    this.genero = genero;

    this.duracaoSegundos = this.formatarDuracao(duracao);
    this.notaIMDb = this.pegarNotaIMDb(notas); 
    this.sinopse = this.escolherSinopse(sinopse);
    this.maiorPremiacao = this.acharPremioPrincipal(premios);
    this.lucro = this.calcularLucro(orcamento, bilheteria);
  }

  formatarDuracao(minutos) {
    if (!minutos) return null;
    return minutos * 60;
  }

  pegarNotaIMDb(notas) {
    if (!notas || notas.length === 0) return "N/A";
    const nota = notas.find((r) => r.fonte === "IMDb");
    return nota ? nota.valor.toString() : "N/A";
  }

  escolherSinopse(listaDeSinopses) {
    if (!listaDeSinopses || listaDeSinopses.length === 0)
      return "Sinopse não disponível.";

    const sinopsePt = listaDeSinopses.find((s) => s.idioma === "pt-br");
    if (sinopsePt) return sinopsePt.texto;

    const sinopseEn = listaDeSinopses.find((s) => s.idioma === "en");
    if (sinopseEn) return sinopseEn.texto;

    return listaDeSinopses[0].texto;
  }

  acharPremioPrincipal(premios) {
    if (!premios || premios.length === 0) return "Nenhum prêmio listado.";

    const premioPrincipal = premios.reduce((melhor, atual) => {
      return atual.relevancia > melhor.relevancia ? atual : melhor;
    });

    return premioPrincipal.nome;
  }

  calcularLucro(orcamentoTxt, bilheteriaTxt) {
    const converterMoedaParaNumero = (texto) => {
      if (!texto || typeof texto !== "string") return 0;

      const textoLimpo = texto.replace(/\$|\s/g, "");
      let multiplicador = 1;

      if (textoLimpo.toLowerCase().includes("milhões")) {
        multiplicador = 1000000;
      } else if (textoLimpo.toLowerCase().includes("bilhão")) {
        multiplicador = 1000000000;
      }

      const numero = parseFloat(textoLimpo.replace(/milhões|bilhão/i, ""));
      return isNaN(numero) ? 0 : numero * multiplicador;
    };

    const orcamento = converterMoedaParaNumero(orcamentoTxt);
    const bilheteria = converterMoedaParaNumero(bilheteriaTxt);
    const lucroFinal = bilheteria - orcamento;

    return `$${lucroFinal.toLocaleString("pt-BR")}`;
  }

  toJSON() {
    return {
      titulo: this.titulo,
      ano: this.ano,
      diretor: this.diretor,
      genero: this.genero,
      duracaoSegundos: this.duracaoSegundos,
      notaIMDb: this.notaIMDb,
      lucro: this.lucro,
      maiorPremiacao: this.maiorPremiacao,
      sinopse: this.sinopse,
    };
  }
}

module.exports = Filme;
