# 1. Usamos una imagen de Node 22 (ligera y moderna)
FROM node:22-alpine

# 2. Creamos la carpeta de trabajo dentro del servidor
WORKDIR /app

# 3. Copiamos primero los archivos de dependencias (para aprovechar caché)
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código
COPY . .

# 6. CONSTRUIMOS LA APP (Aquí se crea la carpeta 'dist')
RUN npm run build

# 7. Instalamos 'serve', un servidor web ligero para apps estáticas
RUN npm install -g serve

# 8. Exponemos el puerto 3000
EXPOSE 3000

# 9. LA ORDEN FINAL: "Sirve la carpeta dist en el puerto 3000"
# La bandera -s es vital para que funcione como Single Page App
CMD ["serve", "-s", "dist", "-l", "3000"]