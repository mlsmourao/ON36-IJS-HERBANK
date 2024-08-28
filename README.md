<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Descrição

Este projeto é uma API construída usando [NestJS](https://github.com/nestjs/nest), um framework Node.js progressivo para a construção de aplicações server-side eficientes e escaláveis.

# Instalação

```bash
$ npm install
```

# Executando a aplicação

```bash
# modo de desenvolvimento
$ npm run start

# modo de desenvolvimento com auto-reload
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

# Testes Unitários

- Ferramenta utilizada: **Jest**

```bash
# testes unitários
$ npm test

```

# Testando as Mudanças

Para testar as mudanças, você pode utilizar a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do VS Code. Arquivos **´.http´** predefinidos já foram criados no repositório para facilitar o teste dos endpoints.

1. Instale a extensão REST Client no VS Code.
2. Abra um dos arquivos **´.http´** na raiz do projeto. Estes arquivos contêm requisições de exemplo para testar os endpoints da API.
3. No arquivo **´.http´**, clique no botão **"Send Request"** próximo a cada requisição para executá-la.

# Endpoints disponíveis

Aqui está a lista de endpoints disponíveis na API, cada um deles pode ser testado usando os arquivos .**´.http´** predefinidos:

## Accounts
- **GET /accounts**: Lista todas as contas
- **GET /accounts/{id}**: Obtem dados da conta com o id repassado como parâmetro.
- **POST /accounts**: Cria uma nova conta
- **PATCH /accounts**: Atualiza dados da conta
- **DELETE /accounts**: Deleta os dados da conta

## Checking Accounts
- **GET /checking_accounts**: Lista todas as contas correntes
- **GET /checking_accounts/{id}**: Obtem dados da conta corrente com o id repassado como parâmetro.
- **POST /checking_accounts**: Cria uma nova conta corrente
- **PATCH /checking_accounts**: Atualiza dados da conta corrente
- **DELETE /checking_accounts**: Deleta os dados da conta corrente

## Savings Accounts
- **GET /savings_accounts**: Lista todas as contas poupança
- **GET /savings_accounts/{id}**: Obtem dados da conta poupança com o id repassado como parâmetro.
- **POST /savings_accounts**: Cria uma nova conta poupança
- **PATCH /savings_accounts**: Atualiza dados da conta poupança
- **DELETE /savings_accounts**: Deleta os dados da conta poupança

## Transactions
- **GET /transactions**: Lista todas as transações
- **GET /transactions/{id}**: Obtem dados da transação com o id repassado como parâmetro.
- **POST /transactions**: Cria uma nova transação
- **PATCH /transactions**: Atualiza dados da transação
- **DELETE /transactions**: Deleta os dados de uma transação

## Customers
- **GET /customers**: Lista todos os clientes
- **GET /customers/{id}**: Obtem dados dos clientes com o id repassado como parâmetro.
- **POST /customers**: Cria um novo cliente
- **PATCH /customers**: Atualiza dados do cliente
- **DELETE /customers**: Deleta os dados de um cliente

## Managers
- **GET /managers**: Lista todos os gerentes
- **GET /managers/{id}**: Obtem dados dos gerentes com o id repassado como parâmetro.
- **POST /managers**: Cria um novo gerente
- **PATCH /managers**: Atualiza dados do gerente
- **DELETE /managers**: Deleta os dados de um gerente
  
## Credits
- **GET /credits**: Lista todas as solicitações de crédito
- **GET /credits/{id}**: Obtem dados do crédito com o id repassado como parâmetro.
- **POST /credits**: Cria um novo crédito
- **PATCH /credits**: Atualiza dados do crédito
- **DELETE /credits**: Deleta os dados do crédito

## Credit Cards
- **GET /credit_cards**: Lista todos os cartões de crédito
- **GET /credit_cards/{id}**: Obtem dados do cartão de crédito com o id repassado como parâmetro.
- **POST /credit_cards**: Cria um novo cartão de crédito
- **PATCH /credit_cards**: Atualiza dados do cartão de crédito
- **DELETE /credit_cards**: Deleta os dados do cartão de crédito

## Loans
- **GET /loans**: Lista todos os pedidos de empréstimo
- **GET /loans/{id}**: Obtem dados do empréstimo com o id repassado como parâmetro.
- **POST /loans**: Cria um novo pedido de empréstimo
- **PATCH /loans**: Atualiza dados do pedido de empréstimo.
- **DELETE /loans**: Deleta os dados do empréstimo.

# Suporte
Nest é um projeto open-source licenciado sob a licença MIT. Ele pode crescer graças aos patrocinadores e ao suporte dos incríveis apoiadores. Se você gostaria de se juntar a eles, por favor, [leia mais aqui](https://docs.nestjs.com/support).

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

Nest é licenciado pelo MIT.

# Desenvolvimento da API

- Autor: Maria Luiza Mourão
- Linkedin: [Maria Luiza Mourão](https://www.linkedin.com/in/maria-luiza-silva-mour%C3%A3o/)



