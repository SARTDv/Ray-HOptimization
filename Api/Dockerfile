# Dockerfile para la API Flask con Ray y dependencias
FROM python:3.11-slim

# Variables de entorno para evitar buffering y permitir Flask en contenedor
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP=app.py

# Crear directorio de trabajo
WORKDIR /app

# Copiar requirements y código fuente
COPY requirements.txt ./
COPY . .

# Instalar dependencias principales
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Instalar Ray aparte (no en requirements.txt por compatibilidad)
RUN pip install ray

# Exponer el puerto de Flask
EXPOSE 5000
EXPOSE 6379

# Iniciar servidor Ray en el puerto 6379
CMD ["/start.sh"]
