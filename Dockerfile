# Build stage: Build the React frontend
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage: Run the Node.js backend
FROM node:18-alpine
WORKDIR /app

# Copy backend dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy backend source
COPY server/ ./server/

# Copy built frontend from build-stage to where backend expects it
COPY --from=build-stage /app/dist ./dist

EXPOSE 5000

# Start from the server directory
WORKDIR /app/server
CMD ["node", "index.js"]
