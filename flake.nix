{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};

      packageList = with pkgs; [
        typescript-language-server
        nodejs
        nest-cli
        mariadb
        jq
        docker
      ];

      defaultHook = ''
        echo ""
        echo "Ambiente de desenvolvimento sem execução de base de dados (Tooling)"
        echo "Alternativamente: Execute 'nix develop .#Native' (Nativo) ou 'nix develop .#Docker' (Container)"
        echo ""
      '';

      Native = ''
        DATA_DIR="$PWD/.mariadb-data"
        SOCKET_FILE="$DATA_DIR/mysql.sock"
        PID_FILE="$DATA_DIR/mariadb.pid"

        stop-db() {
          if [ -f "$PID_FILE" ]; then
            echo "Parando MariaDB nativo..."
            kill $(cat "$PID_FILE") && rm -f "$PID_FILE"
          else
            echo "MariaDB não está rodando."
          fi
        }
        trap stop-db EXIT

        if [ ! -d "$DATA_DIR" ]; then
          echo "Criando e inicializando novo banco MariaDB local..."
          mkdir -p "$DATA_DIR"

          mysql_install_db --auth-root-authentication-method=normal --datadir="$DATA_DIR" > /dev/null 2>&1
          echo "CREATE DATABASE IF NOT EXISTS main;" | mariadbd --datadir="$DATA_DIR" --bootstrap
        fi

        if [ ! -f "$PID_FILE" ]; then
          echo "Iniciando MariaDB (rootless)..."
          mariadbd --datadir="$DATA_DIR" \
                   --socket="$SOCKET_FILE" \
                   --pid-file="$PID_FILE" \
                   --port=3306 \
                   --bind-address=127.0.0.1 > "$DATA_DIR/mariadb.log" 2>&1 &

          while [ ! -S "$SOCKET_FILE" ]; do sleep 0.1; done
        else
          echo "MariaDB já está rodando"
        fi

        echo "Informações do mariaDB (Nativo)"
        echo " Host: 127.0.0.1  |  Port: 3306"
        echo " User: root       |  DB:   main (Sem senha)"
        echo " "
        echo " Conectar via TCP:    mysql -h 127.0.0.1 -u root"
        echo " Conectar via Socket: mysql --socket=$SOCKET_FILE -u root"
        echo " Desligar:            stop-db"
      '';

      dockerHook = ''
        # Verifica se o daemon do Docker está rodando
        if ! docker info > /dev/null 2>&1; then
          echo "Erro: O daemon do Docker não está rodando!"
          echo "Por favor, certifique-se de que o Docker está ativo e tente novamente."
        else
          # Cria a pasta local para evitar problemas de permissão (root) antes do compose subir
          mkdir -p .docker-mariadb/storage

          start-container-db() {
            echo "A iniciar o MariaDB via Docker Compose..."
            docker compose up -d
          }

          stop-container-db() {
            echo "A parar os serviços do Docker Compose..."
            docker compose down
          }

          start-container-db
          trap stop-container-db EXIT

          echo ""
          echo "Ambiente Docker Compose Ativo!"
          echo " O banco de dados fechará automaticamente quando você sair do shell."
          echo " Comandos úteis: docker compose ps | docker compose logs -f"
          echo ""
        fi
      '';

    in
    {
      devShells.${system} = {
        default = pkgs.mkShell {
          nativeBuildInputs = packageList;
          shellHook = defaultHook;
        };
        Native = pkgs.mkShell {
          nativeBuildInputs = packageList;
          shellHook = Native;
        };
        Docker = pkgs.mkShell {
          nativeBuildInputs = packageList;
          shellHook = dockerHook;
        };
      };
    };
}
