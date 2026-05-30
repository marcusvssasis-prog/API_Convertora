# Como rodar:

```cd api-convertora & nix develop .#Podman```

- Verifique se houve erros na execução do DB.
- Opcionalmente, para entrar com as ferramentas, sem executar novamente o container: ```nix develop```

e então: \

```npm run start:dev```

 Após isso abra outro terminal para executar as ações de GET/POST


Tasks:
Criar conversão de moeda []; \
--> Req: Capacidade do Nest criar tabela na DB [] (Preforma) com esses (Provaveis) valores:
Consultar conversões realizadas []; \
--> Req: fetch no DB.;\
Atualizar uma conversão existente []; \
--> Req: Updt on DB.;\
Converter valores utilizando taxas de câmbio atualizadas ou simuladas []; \
--> Req: (Teorico?) Criar valores simulados onde 'moeda' recebe de uma var (vinda de db?) que declara valor pre-conversão; \
Persistir históricod de conversões []; \
--> Req: Fazer que cada POST também anote seu resultado na DB. \
Tratamento de exceções []; \
--> Req: idk, native? \

Subtasks (dependências):
--> Conectar o Nest ao MariaDB [X];
--> ShellHook do devshell para executar podman & MariaDB (Rootless) [X];

Curls Atuais / Exemplos:

# criar moeda
curl -X POST localhost:3000/moedas \
  -H "Content-Type: application/json" \
  -d '{"nome": "BRL"}'

# criar mais algumas
curl -X POST localhost:3000/moedas \
  -H "Content-Type: application/json" \
  -d '{"nome": "EUR"}'

curl -X POST localhost:3000/moedas \
  -H "Content-Type: application/json" \
  -d '{"nome": "JPY"}'

# adicionar cotação a uma moeda
curl -X POST localhost:3000/moedas/1/cotacao \
  -H "Content-Type: application/json" \
  -d '{"valor": 5.72}'

# adicionar mais cotações (histórico)
curl -X POST localhost:3000/moedas/1/cotacao \
  -H "Content-Type: application/json" \
  -d '{"valor": 5.68}'

curl -X POST localhost:3000/moedas/2/cotacao \
  -H "Content-Type: application/json" \
  -d '{"valor": 0.92}'

# listar todas as moedas com cotações
curl localhost:3000/moedas

# buscar moeda específica
curl localhost:3000/moedas/1

# atualizar nome
curl -X PATCH localhost:3000/moedas/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "USD"}'

# deletar moeda (e cotações em cascata)
curl -X DELETE localhost:3000/moedas/3

