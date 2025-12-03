# Use Node.js official image
FROM node:22.16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json /app/
COPY src /app/src
COPY public /app/public

# Install dependencies
RUN npm install

# Expose port 3000 for React
EXPOSE 3000

# Start React in development mode
CMD ["npm", "start"]
