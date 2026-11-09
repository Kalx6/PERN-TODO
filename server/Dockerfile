# 1. Use an official lightweight Node.js image based on Alpine Linux
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package dependency files first (to leverage layer caching!)
COPY package*.json ./

# 4. Install production dependencies cleanly using npm ci
RUN npm ci --only=production

# 5. Copy the rest of the backend source code into the container
COPY . .

# 6. Document the port the Express server listens on internally
EXPOSE 5000

# 7. Define the default command to start your server
CMD ["node", "server.js"]