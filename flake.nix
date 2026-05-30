{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:

    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      PackageList = with pkgs; [
        typescript-language-server
        nodejs
        nest-cli
        mariadb
      ];

    in

    {

      devShells.${system} = {
        default = pkgs.mkShell {
          nativeBuildInputs = [
            PackageList

          ];
          shellHook = ''
            echo "Ambiente de desenvolvimento sem execução de podman (Tooling) \n
                    alternativamente: Executar nix develop .#Podman para entrar em um devShell com a execução do mariaDB"'';
        };
        Podman = pkgs.mkShell {
          nativeBuildInputs = [
            PackageList
          ];

          shellHook = ''
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

                      if [ ! -d "$DATA_DIR" ]; then
                        echo "Criando e inicializando novo banco MariaDB local..."
                        mkdir -p "$DATA_DIR"

                        # Inicializa a estrutura de diretórios do banco
                        mysql_install_db --auth-root-authentication-method=normal --datadir="$DATA_DIR" > /dev/null 2>&1

                        # Cria o banco de dados 'main' automaticamente (equivalente ao MYSQL_DATABASE)
                        mariadbd --datadir="$DATA_DIR" --bootstrap <<EOF
            CREATE DATABASE IF NOT EXISTS main;
            EOF
                      fi

                      if [ ! -f "$PID_FILE" ]; then
                        echo "Iniciando MariaDB (rootless)..."
                        mariadbd --datadir="$DATA_DIR" \
                                 --socket="$SOCKET_FILE" \
                                 --pid-file="$PID_FILE" \
                                 --port=3306 \
                                 --bind-address=127.0.0.1 > "$DATA_DIR/mariadb.log" 2>&1 &

                        # Aguarda o banco iniciar e criar o arquivo de socket
                        while [ ! -S "$SOCKET_FILE" ]; do sleep 0.1; done
                      else
                        echo "MariaDB já está rodando"
                      fi

                      echo "Informações do mariaDB (Nativo)"
                      echo " Host: 127.0.0.1  |  Port: 3306"
                      echo " User: root       |  DB:   main"
                      echo " "
                      echo " Conectar via TCP:    mysql -h 127.0.0.1 -u root"
                      echo " Conectar via Socket: mysql --socket=$SOCKET_FILE -u root"
                      echo " Desligar:            command: stop-db"
          '';
        };
      };
    };
}
