import { faker } from '@faker-js/faker';
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

        console.log('Seed: User Admin');
    }


    // MEMBER
    {
        for (let i = 0; i < 20; i++) {
            const member: Prisma.UserCreateInput = {
                email: `member${i}@gmail.com`,
                name: faker.person.fullName(),
                phone: '+62 812-1111-1111',
                password,
                role: 'MEMBER',
                avatar: faker.image.avatar(),
                avatar_md: faker.image.avatar()
            };

            await prisma.user.create({
                data: member
            });


        }

        console.log('Seed: User MEMBER');
    }
}