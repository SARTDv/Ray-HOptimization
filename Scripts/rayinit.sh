#!/bin/bash

# Obtener IP privada del nodo
PRIVATE_IP=$(hostname -I | awk '{print $1}')

# Comando para iniciar el nodo head
start_head() {
    echo "Iniciando nodo HEAD en IP $PRIVATE_IP"
    ray start --head --port=6379 --dashboard-host=0.0.0.0
}

# Comando para conectar el worker
start_worker() {
    HEAD_IP=$1
    echo "Conectando WORKER a HEAD $HEAD_IP"

    while true; do
        # Verifica si el puerto 10001 del head está abierto (head disponible)
        if nc -z $HEAD_IP 10001; then
            echo "HEAD accesible. Iniciando conexión Ray..."
            ray start --address="$HEAD_IP:10001"
            break
        else
            echo "HEAD no disponible. Reintentando en 5 segundos..."
            sleep 5
        fi
    done

    # Loop para verificar conexión y reconectar si es necesario
    while true; do
        # Verifica si Ray sigue corriendo (ejemplo simple usando `ray status`)
        ray status &>/dev/null
        if [ $? -ne 0 ]; then
            echo "Conexión Ray perdida. Reintentando conexión..."
            ray stop
            sleep 3
            ray start --address="$HEAD_IP:6379"
        fi
        sleep 10  # Revisa cada 10 segundos
    done
}

# Lógica de selección HEAD o WORKER
if [ "$1" == "head" ]; then
    start_head
else
    if [ -z "$2" ]; then
        echo "Uso: ./setup_ray.sh worker <HEAD_NODE_PRIVATE_IP>"
        exit 1
    fi
    start_worker "$2"
fi
