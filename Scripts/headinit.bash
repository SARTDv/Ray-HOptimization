#!/bin/bash
# escript para configurar el entorno y ejecutar el servidor Flask en ec2 para el nodo HEAD
# Actualizar paquetes del sistema
sudo apt update -y
sudo apt upgrade -y

# Instalar Git y Python
sudo apt install -y python3-pip
sudo apt install -y python3-venv
# Clonar el repositorio
cd /home/ubuntu
git clone https://github.com/BayronJDv/Ray-HOptimization.git
cd Ray-HOptimization

cd Api
# Crear un entorno virtual
python3 -m venv venv
# Activar el entorno virtual
source venv/bin/activate
# Instalar las dependencias del proyecto
pip3 install -r requirements.txt
pip3 install ray

# Ejecutar servidor Flask
ray start --head --port=6379
python3 app.py 
