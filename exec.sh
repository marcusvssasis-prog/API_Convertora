#!/run/current-system/sw/bin/bash

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
  echo "Erro: O daemon do Docker não está rodando!"
  echo "Por favor, certifique-se de que o Docker está ativo e tente novamente."
else
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
  echo "O banco de dados fechará automaticamente quando você sair deste shell."
  echo "Comandos úteis: docker compose ps | docker compose logs -f"
  echo ""

  exec $SHELL
fi
