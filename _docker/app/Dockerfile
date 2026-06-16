FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 👇 ЭТО ДЛЯ СБОРКИ (builder)
ARG NEXT_PUBLIC_ROOT_PROTOCOL
ARG NEXT_PUBLIC_ROOT_DOMAIN
ARG NEXT_PUBLIC_ROOT_BACKEND
ARG APP_ENV
ARG UPSTASH_REDIS_REST_URL
ARG UPSTASH_REDIS_REST_TOKEN

ENV NEXT_PUBLIC_ROOT_PROTOCOL=$NEXT_PUBLIC_ROOT_PROTOCOL
ENV NEXT_PUBLIC_ROOT_DOMAIN=$NEXT_PUBLIC_ROOT_DOMAIN
ENV NEXT_PUBLIC_ROOT_BACKEND=$NEXT_PUBLIC_ROOT_BACKEND
ENV APP_ENV=$APP_ENV
ENV UPSTASH_REDIS_REST_URL=$UPSTASH_REDIS_REST_URL
ENV UPSTASH_REDIS_REST_TOKEN=$UPSTASH_REDIS_REST_TOKEN

ENV NEXT_TELEMETRY_DISABLED=1
RUN rm -rf .next
RUN npm run build

# ==============================================
# 👇👇👇 А ЭТО ДЛЯ РАБОТЫ (runner) 👇👇👇
# ==============================================

FROM node:20-alpine AS runner
WORKDIR /app

# 👇 ВОТ ЗДЕСЬ ТОЖЕ НУЖНО ОБЪЯВИТЬ!
ARG APP_ENV
ARG UPSTASH_REDIS_REST_URL
ARG UPSTASH_REDIS_REST_TOKEN

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 👇 ВОТ ЗДЕСЬ ТОЖЕ НУЖНО УСТАНОВИТЬ!
ENV APP_ENV=$APP_ENV
ENV UPSTASH_REDIS_REST_URL=$UPSTASH_REDIS_REST_URL
ENV UPSTASH_REDIS_REST_TOKEN=$UPSTASH_REDIS_REST_TOKEN

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 52552
ENV PORT=52552
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]