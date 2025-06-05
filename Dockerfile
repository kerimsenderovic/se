FROM node:18-alpine # Use alpine for smaller image size

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install --production

# Copy all files
COPY . .

# Set production environment
ENV NODE_ENV=production

EXPOSE 3000

# Use node directly in production (not nodemon)
CMD ["node", "app.js"]