FROM node:18

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install --production

# Copy ALL files (except those in .dockerignore)
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]