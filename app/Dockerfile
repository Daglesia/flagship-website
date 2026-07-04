FROM oven/bun:1-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json bun.lockb* yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f bun.lockb ]; then bun install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then bun install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then bun install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then bun install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME="0.0.0.0" bun server.js