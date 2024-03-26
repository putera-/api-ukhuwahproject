import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


export async function slideSeed(prisma: PrismaClient) {
    for (let i = 0; i < 5; i++) {

        await prisma.slide.create({
            data: {
                path: faker.image.urlPicsumPhotos(),
            }
        });

    }

    console.log('Seed: Slide');
}
