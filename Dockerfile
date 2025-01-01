# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the backend directory contents into the container.
COPY backend/package*.json ./
COPY backend/ ./

# Install backend dependencies.
RUN npm install

# Copy the frontend directory contents into the container.
COPY frontend/ ./frontend

# Install frontend dependencies.
RUN cd frontend && npm install && npm run build

# Copy the rest of the backend directory contents into the container.
COPY backend/ .

# Set environment variables.
ENV NODE_ENV=production

# Start the server.
CMD [ "npm", "start" ]