import { PrismaClient } from '@prisma/client';
import { userSeed } from './seed/user';
import { clientSeed } from './seed/client';
import { articleSeed } from './seed/article';
import { itikafSeed } from './seed/itikaf';
import { slideSeed } from './seed/slide';
import { asaatidzSeed } from './seed/asaatidz';
const prisma = new PrismaClient();

async function main() {
    const clientid: string = '94de0914-cf51-47a4-8234-812824d9848a';
    await clientSeed(prisma, clientid);
    await userSeed(prisma);
    await articleSeed(prisma);
    await slideSeed(prisma);
    await asaatidzSeed(prisma);
    await itikafSeed(prisma);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
