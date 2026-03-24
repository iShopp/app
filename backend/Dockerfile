# ─── Stage 1: Dependency resolution (with OpenSSL for Prisma) ───────────────
FROM node:20-alpine AS deps
WORKDIR /app

# OpenSSL is required by Prisma's query engine on Alpine
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm ci

# ─── Stage 2: Build ──────────────────────────────────────────────────────────
FROM deps AS builder
WORKDIR /app

COPY . .
# Disable Prisma telemetry/update checks for a deterministic offline build
RUN CHECKPOINT_DISABLE=1 npx prisma generate
RUN npm run build

# ─── Stage 3: Production dependencies ────────────────────────────────────────
FROM node:20-alpine AS prod-deps
WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ─── Stage 4: Minimal production runtime ─────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 appgroup && \
    adduser  --system --uid 1001 --ingroup appgroup ishopuser

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder   /app/dist         ./dist
COPY --from=builder   /app/prisma       ./prisma
# Copy the generated Prisma client (prisma CLI is a devDep not present in
# prod-deps; the client was already generated in the builder stage)
COPY --from=builder   /app/node_modules/.prisma ./node_modules/.prisma

USER ishopuser
EXPOSE 3001

CMD ["node", "dist/main"]
