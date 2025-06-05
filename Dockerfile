# Use official Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package files first (for better cache)
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the app files
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
