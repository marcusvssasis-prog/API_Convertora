# Como rodar:

```cd api-convertora & nix develop .#Podman```

- Verifique se houve erros na execução do DB.
- Opcionalmente, para entrar com as ferramentas, sem executar novamente o container: ```nix develop```

e então: \

```npm run start:dev```

 Após isso abra outro terminal para executar as ações de GET/POST


Tasks:
Criar conversão de moeda [X]; \
--> Req: Capacidade do Nest criar tabela na DB [X] (Preforma) com esses (Provaveis) valores:
Consultar conversões realizadas [X]; \
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

{moeda} -> codigo 3 digitos moeda, aka, BRL, EUR... (STRING) \
{valor} -> valor (INT) \
_Pass de JQ para leitura, tool disponivel no flake._ \

# criar moeda
```
curl -X POST localhost:3000/moedas \
  -H "Content-Type: application/json" \
  -d '{"nome": "NOME"}'
```

# Empurra valor de cotação a moeda criada
```
curl -X POST localhost:3000/moedas/${id}/cotacao \ # <- Verificar ID em listação de cotações \
  -H "Content-Type: application/json" \
  -d '{"valor": 1'
```

# listar todas as moedas com cotações
```
curl localhost:3000/moedas | jq
```

# buscar moeda específica
```
curl localhost:3000/moedas/1 | jq
```

# atualizar nome
```
curl -X PATCH localhost:3000/moedas/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "USD"}
```

# deletar moeda (E suas cotaçẽos)
curl -X DELETE localhost:3000/moedas/3

# converter
```
curl -X POST localhost:3000/moedas/converter \
  -H "Content-Type: application/json" \
  -d '{"from": "moeda", "to": "moeda", "amount": 1}' | jq
```


