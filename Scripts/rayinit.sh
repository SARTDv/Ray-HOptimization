#!/bin/bash

# Obtener IP privada del nodo worker
PRIVATE_IP=$(hostname -I | awk '{print $1}')

# Comando para conectar el worker
start_worker() {
    HEAD_IP=$1
    echo "Conectando WORKER desde $PRIVATE_IP a HEAD $HEAD_IP"

    while true; do
        echo "Intentando conectar a HEAD $HEAD_IP:6379..."
        
        # Intenta conectar directamente a Ray
        ray start --address="$HEAD_IP:6379"
        
        # Verifica si la conexión fue exitosa
        if [ $? -eq 0 ]; then
            echo "✓ Conexión Ray establecida exitosamente"
            break
        else
            echo "✗ Falló la conexión. Reintentando en 5 segundos..."
            # Asegurarse de limpiar cualquier proceso ray anterior
            ray stop &>/dev/null
            sleep 5
        fi
    done

}

# Verificar argumentos
if [ -z "$1" ]; then
    echo "Uso: ./ray_worker.sh <HEAD_NODE_IP>"
    echo "Ejemplo: ./ray_worker.sh 192.168.1.100"
    exit 1
fi

echo "=== RAY WORKER SETUP ==="
echo "Worker IP: $PRIVATE_IP"
echo "Head IP: $1"
echo "========================"


# Iniciar worker
start_worker "$1"