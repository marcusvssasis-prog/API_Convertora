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
        podman
      ];

      defaultHook = ''
        echo ""
        echo "Ambiente de desenvolvimento sem execução de base de dados (Tooling)"
        echo "Alternativamente: Execute 'nix develop .#Podman' (Nativo) ou 'nix develop .#PodmanWSL' (Contentor)"
        echo ""
      '';

      localDBHook = ''
        DATA_DIR="$PWD/.mariadb-data"
        SOCKET_FILE="$DATA_DIR/mysql.sock"
        PID_FILE="$DATA_DIR/mariadb.pid"
        DB_PASS="root"

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
          mysql_install_db \
            --auth-root-authentication-method=normal \
            --datadir="$DATA_DIR" \
            --password="$DB_PASS" \
            > /dev/null 2>&1

          mariadbd --datadir="$DATA_DIR" --bootstrap <<EOF
        CREATE DATABASE IF NOT EXISTS \`main\`;
        GRANT ALL PRIVILEGES ON \`main\`.* TO 'root'@'%' IDENTIFIED BY '$DB_PASS';
        GRANT ALL PRIVILEGES ON \`main\`.* TO 'root'@'localhost' IDENTIFIED BY '$DB_PASS';
        FLUSH PRIVILEGES;
        EOF
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

        echo "Informações do MariaDB (Nativo)"
        echo " Host: 127.0.0.1  |  Port: 3306"
        echo " User: root       |  Pass: $DB_PASS  |  DB: main"
        echo " "
        echo " Conectar via TCP:    mysql -h 127.0.0.1 -u root -p$DB_PASS"
        echo " Conectar via Socket: mysql --socket=$SOCKET_FILE -u root -p$DB_PASS"
        echo " Desligar:            stop-db"
      '';

      podmanWslHook = ''
              export PODMAN_USERNS=keep-id

              export DOCKER_HOST="unix:///run/user/$(id -u)/podman/podman.sock"

              if ! podman info > /dev/null 2>&1; then
                podman system service --time=0 &
                sleep 1
              fi

              PODMAN_DIR="$PWD/.podman-wsl"
              export XDG_CONFIG_HOME="$PODMAN_DIR/config"
              export XDG_DATA_HOME="$PODMAN_DIR/data"
              export XDG_RUNTIME_DIR="/tmp/podman-rt-$USER"

              mkdir -p "$XDG_CONFIG_HOME/containers" "$XDG_DATA_HOME" "$XDG_RUNTIME_DIR"
              chmod 700 "$XDG_RUNTIME_DIR"

              if [ ! -f "$XDG_CONFIG_HOME/containers/policy.json" ]; then
                cat <<EOF > "$XDG_CONFIG_HOME/containers/policy.json"
        { "default": [{"type": "insecureAcceptAnything"}] }
        EOF
              fi

              if [ ! -f "$XDG_CONFIG_HOME/containers/registries.conf" ]; then
                cat <<EOF > "$XDG_CONFIG_HOME/containers/registries.conf"
        [registries.search]
        registries = ['docker.io', 'quay.io']
        EOF
              fi

              start-container-db() {
                echo "A iniciar contentor MariaDB via Podman..."
                mkdir -p "$PODMAN_DIR/mariadb-storage"
                if podman ps -a --format "{{.Names}}" | grep -q "^mariadb-wsl$"; then
                  podman start mariadb-wsl
                else
                  podman run -d \
                    --name mariadb-wsl \
                    -p 3306:3306 \
                    -v "$PODMAN_DIR/mariadb-storage:/var/lib/mysql:Z" \
                    -e MARIADB_ROOT_PASSWORD=root \
                    -e MARIADB_DATABASE=main \
                    mariadb:latest
                fi
                echo "MariaDB ativo no Podman (Porta 3306)."
              }

              stop-container-db() {
                echo "A parar contentor MariaDB..."
                podman stop mariadb-wsl
              }

              start-container-db
              trap stop-container-db EXIT

              echo ""
              echo "Ambiente Podman + WSL Ativo! ($PODMAN_DIR)"
              echo " Comandos: podman ps | stop-container-db | start-container-db"
              echo ""
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
          shellHook = localDBHook;
        };
        PodmanWSL = pkgs.mkShell {
          nativeBuildInputs = packageList;
          shellHook = podmanWslHook;
        };
      };
    };
}
