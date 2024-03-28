import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


export async function asaatidzSeed(prisma: PrismaClient) {
    for (let i = 0; i < 10; i++) {

        await prisma.asaatidz.create({
            data: {
                name: 'Ustadz ' + faker.person.fullName() + ', Lc. MA.',
                profile: faker.person.bio(),
                avatar: faker.image.avatar(),
                avatar_md: faker.image.avatar(),
            }
        });
    }

    console.log('Seed: Asaatidz');
}
