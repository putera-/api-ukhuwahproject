import { Prisma, PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

export async function userSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);

    // SUPERADMIN
    {
        const email = `superadmin@gmail.com`;

        const superadmin: Prisma.UserCreateInput = {
            email,
            name: 'So Super',
            phone: '+62 812-1111-1111',
            password,
            role: 'SUPERUSER'
        };

        await prisma.user.upsert({
            where: { email },
            update: superadmin,
            create: superadmin,
        });
    }
    console.log('Seed: User SuperAdmin');

    // ADMIN
    {
        const email = `admin@gmail.com`;

        const admin: Prisma.UserCreateInput = {
            email,
            name: 'So Admin',
            phone: '+62 812-1111-1111',
            password,
            role: 'ADMIN'
        };

        await prisma.user.upsert({
            where: { email },
            update: admin,
            create: admin,
        });
    }

    console.log('Seed: User Admin');
}
