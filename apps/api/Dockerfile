# ==========================================
# BUILD STAGE
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /workspace

# Copy root workspace configuration files
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy shared packages
COPY packages ./packages

# Copy service-specific files
COPY apps/api/package.json ./apps/api/
COPY apps/api/tsconfig*.json ./apps/api/
COPY apps/api/nest-cli.json ./apps/api/
COPY apps/api/src ./apps/api/src
COPY apps/api/prisma ./apps/api/prisma

# Install pnpm
RUN npm install -g pnpm@10.2.1

# Install only needed dependencies (without pnpm-lock) and build using TURBO
RUN pnpm install
RUN pnpm run build:backend

# Run migration
RUN pnpm run db:deploy

# ==========================================
# PRODUCTION STAGE
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.2.1

# Set production environment
ENV NODE_ENV=production
ENV HUSKY=0
ENV CI=true

# Copy workspace files for production install
COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/pnpm-workspace.yaml ./
COPY --from=builder /workspace/pnpm-lock.yaml ./

# Copy packages files
COPY --from=builder /workspace/packages ./packages

# Copy service files
COPY --from=builder /workspace/apps/api/package.json ./apps/api/
COPY --from=builder /workspace/apps/api/dist ./apps/api/dist

COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/apps/api/node_modules ./apps/api/node_modules

# Set working directory to service folder
WORKDIR /app/apps/api

# Start the application
CMD ["node", "dist/main"]
