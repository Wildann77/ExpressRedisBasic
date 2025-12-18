import { Router, Request, Response } from 'express';
import redisClient from '../config/redis';
import prisma from '../config/mysql';

const router = Router();

// GET /api/test - Testing Redis cache with MySQL fallback
router.get('/test', async (req: Request, res: Response) => {
    try {
        const cacheKey = 'test:data';

        // 1. Cek apakah data ada di Redis
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            // Data ditemukan di Redis cache
            console.log('✅ Data retrieved from Redis cache');
            return res.json({
                source: 'redis',
                data: cachedData,
                timestamp: new Date().toISOString(),
            });
        }

        // 2. Data tidak ada di cache, ambil dari MySQL Database via Prisma
        console.log('ℹ️  Cache miss, fetching from MySQL via Prisma...');

        const record = await prisma.testData.findFirst();
        const dbData = record ? record.content : 'No data in MySQL';

        // 3. Simpan ke Redis dengan TTL 60 detik
        await redisClient.set(cacheKey, dbData, 'EX', 60);
        console.log('💾 Data saved to Redis with 60s TTL');

        // 4. Return response dari database
        return res.json({
            source: 'database (prisma)',
            data: dbData,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('❌ Error in /api/test:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

// GET /api/test/clear - Clear cache (untuk testing)
router.delete('/test/clear', async (req: Request, res: Response) => {
    try {
        await redisClient.del('test:data');
        console.log('🗑️  Cache cleared');
        return res.json({ message: 'Cache cleared successfully' });
    } catch (error) {
        console.error('❌ Error clearing cache:', error);
        return res.status(500).json({
            error: 'Failed to clear cache',
        });
    }
});

export default router;
