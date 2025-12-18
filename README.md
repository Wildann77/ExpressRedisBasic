# Redis Test API

Project ini adalah simulasi backend untuk pengujian caching menggunakan **Redis** dengan fallback ke **MySQL**. Dibangun menggunakan **Bun**, **Express**, dan **Prisma ORM**, serta dijalankan di dalam container Docker.

## Tech Stack
- **Runtime:** Bun
- **Backend:** Express.js (TypeScript)
- **Database:** MySQL
- **Cache:** Redis
- **ORM:** Prisma
- **Reverse Proxy:** Nginx
- **Infrastructure:** Docker & Docker Compose

## Prerequisites
- Docker & Docker Compose
- Bun (Opsional, untuk pengembangan lokal)

## Cara Menjalankan Project

### 1. Kloning Project
```bash
git clone <repository-url>
cd RedisTest
```

### 2. Jalankan dengan Docker Compose
Pastikan Docker sudah berjalan, kemudian eksekusi perintah berikut:
```bash
docker-compose up -d --build
```
Perintah ini akan membangun image server dan menjalankan semua layanan (App, MySQL, Redis, Nginx).

### 3. Akses API
API dapat diakses melalui port 80 (Nginx):
- **Health Check:** `GET http://localhost/health`
- **Get Test Data (Cached):** `GET http://localhost/api/test`
- **Clear Cache:** `DELETE http://localhost/api/test/clear`

## Pengujian dengan Postman
Gunakan file `postman_collection.json` untuk mengimpor daftar endpoint ke Postman agar pengujian lebih mudah.

## Pengembangan Lokal
Jika ingin menjalankan server tanpa Docker (memerlukan MySQL & Redis lokal):
1. Masuk ke folder server: `cd server`
2. Install dependensi: `bun install`
3. Generate Prisma client: `bun run db:generate`
4. Jalankan mode dev: `bun run dev`

SELAMAT MENCOBA TEMAN2 !!!
