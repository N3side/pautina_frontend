FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 1. Объявляем аргументы (именно те, что у тебя в .env и Secrets)
ARG NEXT_PUBLIC_ROOT_PROTOCOL
ARG NEXT_PUBLIC_ROOT_DOMAIN
ARG NEXT_PUBLIC_ROOT_BACKEND

# 2. Делаем их доступными для 'npm run build'
ENV NEXT_PUBLIC_ROOT_PROTOCOL=$NEXT_PUBLIC_ROOT_PROTOCOL
ENV NEXT_PUBLIC_ROOT_DOMAIN=$NEXT_PUBLIC_ROOT_DOMAIN
ENV NEXT_PUBLIC_ROOT_BACKEND=$NEXT_PUBLIC_ROOT_BACKEND
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# В standalone режиме public и static копируем вручную
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]