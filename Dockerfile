# USAMOS NODE 20
FROM node:20-alpine

# CARPETA DE TRABAJO
WORKDIR /app

# COPIAMOS DEPENDENCIAS
COPY package*.json ./

# INSTALAMOS
RUN npm install

# COPIAMOS EL CÓDIGO
COPY . .

# CONSTRUIMOS LA APP
RUN npm run build

# INSTALAMOS SERVE
RUN npm install -g serve

# EXPONEMOS EL PUERTO 80 (Cambio clave aquí)
EXPOSE 80

# COMANDO DE ARRANQUE: Sirve en puerto 80 (Cambio clave aquí)
CMD ["serve", "-s", "dist", "-l", "80"]