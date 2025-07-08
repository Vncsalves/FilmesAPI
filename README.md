# Documentação da API de Filmes

## Índice
1. [Introdução](#introdução)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Requisitos](#requisitos)
5. [Instalação](#instalação)
6. [Configuração](#configuração)
7. [Uso](#uso)
8. [Endpoints da API](#endpoints-da-api)
9. [Estrutura do Projeto](#estrutura-do-projeto)
10. [Processo de Desenvolvimento](#processo-de-desenvolvimento)  
11. [Conclusão](#conclusão)
12. [Licença](#licença)

## Introdução
Esta API foi desenvolvida como um desafio técnico e demonstra a construção de um backend robusto e bem estruturado em Node.js. A principal função desta aplicação é consumir dados de uma API externa de metadados de filmes, processar, limpar e enriquecer essas informações, e então expô-las através de um endpoint RESTful próprio.

O projeto segue as melhores práticas de desenvolvimento, com uma arquitetura clara baseada em camadas (controllers, services, models), separando as responsabilidades para facilitar a manutenção e escalabilidade. A lógica de negócio para a transformação dos dados é encapsulada na camada de modelo, garantindo um código limpo e testável.

## Funcionalidades
- **Consumo de API Externa**: Busca dados brutos de uma fonte de metadados de filmes.
- **Processamento e Enriquecimento de Dados**:
  - Calcula o **lucro** do filme com base no orçamento e bilheteria.
  - Converte a **duração** de minutos para segundos.
  - Extrai e formata a **nota do IMDb**.
  - Seleciona a **sinopse** mais relevante com base no idioma (priorizando pt-BR > en).
  - Identifica e exibe o **prêmio de maior relevância** do filme.
- **Limpeza de Dados**: Remove informações desnecessárias (`poster`, `trailer`, `locações`) antes de expor os dados.
- **Exposição via API REST**: Fornece um único endpoint `GET` para acessar a lista de filmes já tratados e formatados.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução para o JavaScript no servidor.
- **Express.js**: Framework para a construção da API, gerenciamento de rotas e requisições.
- **Axios**: Cliente HTTP para realizar as chamadas para a API externa.
- **Dotenv**: Para gerenciamento de variáveis de ambiente.

## Requisitos
Para executar este projeto localmente, você precisará ter os seguintes pré-requisitos instalados:
1.  **Node.js**: Versão 18.x ou superior. [Baixe aqui](https://nodejs.org/).
2.  **npm**: Gerenciador de pacotes do Node.js (geralmente instalado com o Node.js).
3.  **Dependências do projeto**: Listadas no arquivo `package.json`.

## Instalação
Siga os passos abaixo para instalar e configurar o projeto em seu ambiente local:

1.  **Clone o repositório**:
    ```bash
    git clone [https://github.com/Vncsalves/FilmesAPI.git](https://github.com/Vncsalves/FilmesAPI.git)
    ```

2.  **Acesse o diretório do projeto**:
    ```bash
    cd FilmesAPI
    ```

3.  **Instale as dependências**:
    ```bash
    npm install
    ```

## Configuração
Para o correto funcionamento da aplicação, é necessário configurar as variáveis de ambiente.

1.  **Crie o arquivo `.env`**:
    Na raiz do projeto, crie um arquivo chamado `.env`. Você pode copiar o arquivo de exemplo `.env.example`.

2.  **Adicione as variáveis de ambiente**:
    Insira as seguintes variáveis no arquivo `.env`:

    ```env
    # Porta em que o servidor vai rodar
    PORT=3000

    # URL da API externa que fornece os metadados dos filmes
    API_METADADOS_URL=[https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/](https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/)
    ```

## Uso
Com o projeto instalado e configurado, siga os passos para executá-lo:

1.  **Inicie o servidor**:
    ```bash
    npm start
    ```

2.  **Acesse a aplicação**:
    O servidor estará rodando e pronto para receber requisições. Por padrão, na porta `3030`.

3.  **Teste os endpoints**:
    Utilize uma ferramenta como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para fazer requisições para a API e verificar as respostas.

## Endpoints da API
A API possui um único endpoint principal, que retorna a lista de filmes processada.

### `Filmes`
#### **GET /filmes**
- **Descrição**: Retorna uma lista de todos os filmes, já com os dados processados, enriquecidos e formatados.
- **Parâmetros**: Nenhum.
- **Resposta de Sucesso (200 OK)**:
  ```json
  [
    {
      "titulo": "O Poderoso Chefão",
      "ano": 1972,
      "diretor": "Francis Ford Coppola",
      "genero": [
        "Crime",
        "Drama"
      ],
      "duracaoSegundos": 10500,
      "notaIMDb": "9.2",
      "lucro": "$239.000.000",
      "maiorPremiacao": "Oscar de Melhor Filme",
      "sinopse": "Um chefão da máfia tenta transferir o controle de seu império clandestino para seu filho relutante."
    },
    {
      "titulo": "Interestelar",
      "ano": 2014,
      "diretor": "Christopher Nolan",
      "genero": [
        "Aventura",
        "Drama",
        "Ficção Científica"
      ],
      "duracaoSegundos": 10140,
      "notaIMDb": "8.6",
      "lucro": "$512.000.000",
      "maiorPremiacao": "Oscar de Melhores Efeitos Visuais",
      "sinopse": "Um grupo de exploradores espaciais viaja através de um buraco de minhoca em busca de um novo lar para a humanidade."
    }
  ]



## Estrutura do Projeto
A organização do projeto segue uma arquitetura em camadas, separando as responsabilidades para garantir um código limpo e de fácil manutenção.

```
FilmesAPI/
├── core/
│   ├── app.js
│   └── server.js
├── src/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   └── filmes-controller.js
│   ├── models/
│   │   └── parseFilmes.js
│   ├── routes/
│   │   └── filmes.js
│   └── services/
│       └── metadadosService.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

- **`core/`**: Contém os arquivos centrais que iniciam a aplicação.
  - **`app.js`**: Configura a aplicação Express, define middlewares e anexa as rotas.
  - **`server.js`**: Cria e inicializa o servidor HTTP.
- **`src/config/`**: Gerencia as configurações da aplicação, como as variáveis de ambiente.
- **`src/controllers/`**: Orquestra o fluxo de dados. Recebe as requisições, chama os serviços e modelos necessários, e envia a resposta.
- **`src/models/`**: Contém a lógica de negócio e a estrutura dos dados. A classe `Filme` é responsável por transformar os dados brutos.
- **`src/routes/`**: Define os endpoints da API e os conecta aos seus respectivos controllers.
- **`src/services/`**: Camada responsável pela comunicação com serviços externos, como a API de metadados.
- **`Arquivos na Raiz`**: Incluem arquivos de configuração do projeto, como `package.json`, `.gitignore` e as variáveis de ambiente.




## Processo de Desenvolvimento
Com certeza! Entendi perfeitamente. A versão anterior ficou muito "corporativa" e perdeu a sua voz no processo. Vamos resgatar essa sinceridade, porque é exatamente isso que torna um relato autêntico e interessante.

Que tal esta versão? Ela segue a mesma estrutura lógica, mas com uma linguagem muito mais pessoal e direta, contando a sua jornada real, com os perrengues e as sacadas que você teve.

Processo de Desenvolvimento (Sua Versão)
Gostei muito de desenvolver essa API. Meu objetivo não era só entregar o que foi pedido, mas construir algo que eu me orgulhasse da organização e da qualidade do código. Abaixo, conto um pouco de como foi o meu processo, passo a passo.

#### 1. Pensando na Estrutura
Antes de tudo, parei pra pensar na organização. Como eu poderia arrumar as pastas e os arquivos de um jeito que fizesse sentido e não virasse bagunça no futuro? Decidi seguir uma arquitetura em camadas, meio que um "MVC adaptado", pra separar bem as responsabilidades: as rotas cuidam dos links, os controllers organizam a casa, e os models/services fazem o trabalho pesado.

#### 2. Montando o Esqueleto do Projeto
Com o plano na cabeça, comecei a montar o "esqueleto" do projeto com Express.js. Já fiz a separação entre server.js (que só 'liga' o servidor) e app.js (que tem a configuração da aplicação), um detalhe que aprendi que ajuda a manter tudo no seu lugar. Também já configurei o dotenv desde o começo para não deixar nenhuma informação sensível solta no código.

#### 3. Buscando os Dados da API
Aqui foi onde a coisa pegou um pouco. Meu primeiro objetivo era simples: usar o axios e só "puxar" os dados brutos da API de metadados. Tive um pouco de dor de cabeça para fazer a comunicação funcionar direitinho, algo que descobri ser comum quando se lida com as requisições assíncronas do Node.js. Depois de pesquisar e fazer alguns testes, consegui receber os dados certinho.

#### 4. A Mágica do Tratamento dos Dados
Com os dados brutos na mão, veio a parte mais legal: transformar aquela "massa" de dados em algo útil e formatado. Eu estou mais acostumado a pegar dados de um banco MySQL, onde tudo já vem mais estruturado. Aqui, o desafio foi diferente: pegar um objeto JSON complexo e aplicar várias regras pra enriquecer ele.

A minha solução foi criar uma classe Filme, que virou o coração do projeto. Joguei toda a lógica de calcular lucro, converter duração, escolher a sinopse, etc., dentro dela. Assim, o controller ficou super limpo, só com a responsabilidade de organizar o fluxo.

#### 5. Entregando o Resultado
No final, foi só juntar tudo: o controller chama o serviço que busca os dados, entrega os dados brutos para a classe Filme fazer a mágica, e por fim, manda a lista de filmes, já toda tratada e "bonitona", como resposta em JSON.

 ## Conclusão
O projeto FilmesAPI foi desenvolvido para ser uma demonstração prática de uma aplicação backend bem arquitetada, robusta e escalável. Mesmo com um escopo focado, a estrutura implementada com separação de responsabilidades permite que o projeto cresça de forma organizada.

A documentação detalhada e a clareza do código visam facilitar o entendimento e a colaboração de outros desenvolvedores. O projeto cumpre seu objetivo de consumir, transformar e servir dados de forma eficiente e profissional.




## Licença
MIT License

Copyright (c) 2025 Vinícius Alves de Santana

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

