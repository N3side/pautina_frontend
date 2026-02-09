# Используем Node.js LTS
FROM node:20-alpine AS deps

WORKDIR /app

# Копируем package.json для установки зависимостей
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /src/app/node_modules ./node_modules
COPY . .

# Сборка приложения
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production образ
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /src/app/public ./public
COPY --from=builder /src/app/package.json ./package.json

# Копируем собранное приложение
COPY --from=builder --chown=nextjs:nodejs /src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]