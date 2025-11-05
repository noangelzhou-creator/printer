# Dockerfile for printer-main with Supabase authentication
# Based on specification requirements

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Expose port 5173 (Vite preview server default port)
EXPOSE 5173

# Start the application in preview mode
CMD ["npm", "run", "preview"]
