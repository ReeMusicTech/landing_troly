# USAMOS NODE 20 (Compatible con Vite 7)
FROM node:20-alpine

# CARPETA DE TRABAJO
WORKDIR /app

# COPIAMOS DEPENDENCIAS
COPY package*.json ./

# INSTALAMOS
RUN npm install

# COPIAMOS EL CÓDIGO
COPY . .

# CONSTRUIMOS LA APP (Crea la carpeta dist)
RUN npm run build

# INSTALAMOS UN SERVIDOR LIGERO
RUN npm install -g serve

# EXPONEMOS EL PUERTO 3000
EXPOSE 3000

# COMANDO DE ARRANQUE: Sirve la carpeta 'dist' como SPA
CMD ["serve", "-s", "dist", "-l", "3000"]