# Empire Dashboard v2 - Dockerfile for Kubernetes deployment
FROM node:18-alpine AS base

# Install production dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build client
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Final stage
FROM node:18-alpine AS production

# Add non-root user for security
RUN addgroup -g 1001 -S nexia && \
    adduser -S nexia -u 1001

WORKDIR /app

# Copy server dependencies and code
COPY --from=base /app/node_modules ./node_modules
COPY package*.json ./
COPY server/ ./server/

# Copy built client
COPY --from=client-builder /app/client/build ./client/build

# Set ownership to nexia user
RUN chown -R nexia:nexia /app
USER nexia

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5002/health || exit 1

# Expose port
EXPOSE 5002

# Environment variables for production
ENV NODE_ENV=production
ENV PORT=5002

# Start command
CMD ["node", "server/server.js"]