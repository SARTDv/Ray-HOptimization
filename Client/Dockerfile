# Usa la imagen oficial de Node 24.0.1
FROM node:24.0.1-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del package manager primero
COPY Client/package.json Client/package-lock.json* Client/pnpm-lock.yaml* Client/yarn.lock* ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY Client/ .

# Expone el puerto que usa Vite
EXPOSE 5173

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]