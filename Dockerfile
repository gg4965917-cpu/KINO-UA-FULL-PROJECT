# Multi-stage build для оптимізації розміру образу

# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копіюємо package files
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Копіюємо dependencies з попереднього stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Вимикаємо telemetry під час build
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js app
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Створюємо non-root користувача
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копіюємо необхідні файли
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Змінюємо власника файлів
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
