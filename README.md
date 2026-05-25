Para rodar:

```
npm install # Se tiver clonado agora, só uma vez.
npm run start:dev # Rodar o nest em si.

```

--> Requires: \

    nodejs (com nest-cli instalado) ou nix usando nix flake develop no diretório atual. \

--> Arquitetura e Estrutura (Clean Architecture & SOLID): \
[X] ---> Estruturar o projeto de forma modular no NestJS \
[X] ---> Aplicar conceitos de Programação Orientada a Objetos (POO) \
[ ] ---> Camada de Negócio: Criar classes, interfaces de repositório e isolar regras de negócio \
[ ] ---> Camada de Dados: Implementar repositórios, configurar ORM/Banco \
[X] ---> Integrar API externa de câmbio \
[ ] ---> Camada de Aplicação (Presentation): Criar controllers, mapear requests/responses e validar entradas \
--> Regras de Negócio e Validações: \
[ ] ---> Validar se o valor monetário recebido é maior que zero \
[ ] ---> Validar se a moeda de origem informada é válida \
[ ] ---> Garantir que as conversões gerem sempre valores em USD e EUR \
[ ] ---> Criar condição caso o valor solicitado já seja USD ou EUR \
[ ] ---> Desacoplar as taxas de câmbio das regras de negócio principais \
--> Endpoints (Operações CRUD): \
[ ] ---> POST /conversions: Criar uma conversão de moeda (recebendo amount e fromCurrency) \
[ ] ---> GET /conversions: Listar todas as conversões realizadas (histórico) \
[ ] ---> GET /conversions/{id}: Consultar uma conversão específica \
[ ] ---> PUT /conversions/{id}: Atualizar uma conversão existente (ex: atualizar o amount) \
[] ---> DELETE /conversions/{id}: Remover uma conversão \
--> Funcionalidades e Requisitos Técnicos: \
[ ] ---> Conexão a uma API de valor atual da moeda \
[ ] ---> Ferramentas comparativas \
[ ] ---> Converter valores utilizando taxas de câmbio atualizadas ou simuladas \
[ ] ---> Persistir histórico de conversões no banco de dados \
[ ] ---> Utilizar DTOs (Data Transfer Objects) para trafegar os dados \
[ ] ---> Implementar tratamento de erros básicos e exceções \
--> Tech Obrigatórias: \
[X] ---> NestJS \
[X] ---> TypeScript \
[ ] ---> MongoDB ou MySQL \
--> Desafios Extras (Evolução do Projeto): \
[ ] ---> Implementar validação de dados utilizando class-validator \
[ ] ---> Criar documentação automática da API utilizando Swagger/OpenAPI <-- Ou até alguma coisa do OpenRouter (DeepSeek). \
--> Documentação e Entrega (Até 01 de Junho de 2026): \
[ ] ---> Garantir que o projeto tem uma estrutura de pastas organizada e está funcional \
[ ] ---> Hospedar o código no GitHub (Todos os membros do grupo devem realizar commits) \
[ ] ---> Criar arquivo README.md contendo: \
[ ] - Descrição do projeto \
[ ] - Tecnologias utilizadas \
[ ] - Instruções de instalação \
[ ] - Instruções para execução \
[ ] - Documentação das rotas da API \
[ ] ---> Preparar a apresentação para o dia da AV2 \

Rotas atuais:

[X] ---> ```/moedas```, função: Recebe retorno do câmbio atual de todas moedas aparti da API externa.
[X] ---> ```/converter```, função: Recebe um corpo json:

```
curl -X POST http://localhost:3000/moedas/converter \
         -H "Content-Type: application/json" \
         -d '{"amount": 100, "fromCurrency": "USD", "toCurrency": "BRL"}'
```

Exemplo de BRL para Dolarrr

