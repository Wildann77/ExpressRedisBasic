import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
});

async function main() {
    try {
        await prisma.$connect();
        console.log('✅ Prisma connected to MySQL successfully');

        // Seed dummy data if empty
        const count = await prisma.testData.count();
        if (count === 0) {
            await prisma.testData.create({
                data: {
                    content: 'Hello from MySQL (via Prisma ORM)!',
                },
            });
            console.log('📝 Initial data seeded via Prisma');
        }
    } catch (error) {
        console.error('❌ Prisma connection error:', error);
    }
}

main();

export default prisma;
