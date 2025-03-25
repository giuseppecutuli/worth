# ==========================================
# BUILD STAGE
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /workspace

# Copy root workspace configuration files
COPY package.json ./
COPY pnpm-workspace.yaml ./
#COPY pnpm-lock.yaml ./ <---DO NOT COPY pnpm-lock.yaml as it will cause blotted node_modules
COPY turbo.json ./

# Copy shared packages
COPY packages/eslint-config ./packages/eslint-config
COPY packages/prettier-config ./packages/prettier-config
COPY packages/typescript-config ./packages/typescript-config

# Copy API libraries
COPY apps/api/libs/common ./apps/api/libs/common

# Copy service-specific files
COPY apps/api/services/auth-service/package.json ./apps/api/services/auth-service/
COPY apps/api/services/auth-service/tsconfig*.json ./apps/api/services/auth-service/
COPY apps/api/services/auth-service/nest-cli.json ./apps/api/services/auth-service/
COPY apps/api/services/auth-service/src ./apps/api/services/auth-service/src

RUN cat ./package.json
RUN cat ./turbo.json

# Install pnpm
RUN npm install -g pnpm@10.2.1

# Install only needed dependencies (without pnpm-lock) and build using TURBO
RUN pnpm install
RUN pnpm run build:backend

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

# Copy packages and libs package.json files
COPY --from=builder /workspace/packages ./packages
COPY --from=builder /workspace/apps/api/libs ./apps/api/libs

# Copy service files
COPY --from=builder /workspace/apps/api/services/auth-service/package.json ./apps/api/services/auth-service/
COPY --from=builder /workspace/apps/api/services/auth-service/dist ./apps/api/services/auth-service/dist

# Install production dependencies
RUN pnpm install --prod --no-frozen-lockfile --ignore-scripts

# Set working directory to service folder
WORKDIR /app/apps/api/services/auth-service

# Start the application
CMD ["node", "dist/main"]

# Expose Auth Service port (adjust if needed)
EXPOSE 3346
