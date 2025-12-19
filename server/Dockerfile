# Gunakan Bun sebagai base image
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS install
COPY package.json bun.lock* ./
RUN bun install

# Copy source code
FROM base AS prerelease
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN bun x prisma generate --schema=./prisma/schema.prisma

# Production image
FROM base AS release
COPY --from=install /app/node_modules ./node_modules
COPY --from=prerelease /app ./

# Jalankan sebagai user non-root untuk keamanan
USER bun

# Ekspos port 3000
EXPOSE 3000

# Jalankan aplikasi dengan Bun
CMD ["bun", "run", "src/index.ts"]
