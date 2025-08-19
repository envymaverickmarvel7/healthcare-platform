FROM node:22-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy other source files
COPY . .

# Expose port and run your app
EXPOSE 5050
CMD ["node", "index.js"]
