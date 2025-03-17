# ==== Build Frontend ====
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

# ==== Build Backend ====
FROM node:20 AS backend-build
WORKDIR /app/backend
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend .
RUN npm run build

# ==== Combined Production Stage ====
FROM node:20
WORKDIR /app

# Copy backend files
COPY --from=backend-build /app/backend ./backend

# Copy frontend build files into backend's public folder (if using express.static)
COPY --from=frontend-build /app/frontend/dist ./backend/public

# Install Redis (Optional — Not recommended for production)
RUN apt-get update && apt-get install -y redis-server

# Expose ports
EXPOSE 3000 6379 8001

# Set environment variables
ENV NODE_ENV=production

# Start Redis and both frontend + backend
CMD bash -c "redis-server --daemonize yes && npm --prefix ./backend run dev"
