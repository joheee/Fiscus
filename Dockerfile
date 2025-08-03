# ---- Base Stage ----
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl

# ---- Dependencies Stage ----
FROM base AS dependencies
COPY package*.json ./
RUN npm install

# ---- Builder Stage ----
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# ---- Production Stage (Final Production Image) ----
FROM base AS production
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static  
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
