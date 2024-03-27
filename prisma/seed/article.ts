import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export async function articleSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);
    const email = `admin@gmail.com`;
    for (let i = 0; i < 20; i++) {


        const admin: Prisma.UserCreateInput = {
            email: `admin${i}@gmail.com`,
            name: 'So Admin',
            password,
            role: 'ADMIN'
        };

        await prisma.user.create({
            data: {
                ...admin,
                articles: {
                    create: {
                        title: faker.lorem.sentence(),
                        content: faker.lorem.paragraphs(),
                        status: 'PUBLISH',
                        photos: {
                            create: {
                                path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                                path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 })
                            }
                        }
                    }
                }
            }
        })

    }

    console.log('Seed: Gallery');
}