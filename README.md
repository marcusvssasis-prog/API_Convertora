# Como rodar:

```cd api-convertora & nix develop .#Podman```

- Verifique se houve erros na execução do DB.
- Opcionalmente, para entrar com as ferramentas, sem executar novamente o container: ```nix develop```

e então: \

```npm run start:dev```

 Após isso abra outro terminal para executar as ações de GET/POST


Tasks:
Criar conversão de moeda []; \
--> Req: idk; \
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



