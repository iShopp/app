# ─── Stage 1: Build ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Disable Prisma telemetry/update checks for a deterministic offline build
RUN CHECKPOINT_DISABLE=1 npx prisma generate
RUN npm run build

# ─── Stage 2: Production ────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nestjs

# Install production dependencies only (no devDeps in the final image)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# Prisma client is generated into node_modules; regenerate against prod deps
RUN CHECKPOINT_DISABLE=1 npx prisma generate

USER nestjs
EXPOSE 3001

CMD ["node", "dist/main"]
