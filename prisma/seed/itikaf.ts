import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export async function itikafSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);
    const email = `admin@gmail.com`;

    const adminData: Prisma.UserCreateInput = {
        email,
        name: 'So Admin',
        phone: '+62 812-1111-1111',
        password,
        role: 'ADMIN'
    };

    // USER
    const admin = await prisma.user.upsert({
        where: { email },
        update: adminData,
        create: adminData,
    });

    // ITIKAF
    const itikaf = await prisma.itikaf.create({
        data: {
            year: '2024',
            hijri_year: '1445',
            description: faker.lorem.paragraphs(),
            photo: faker.image.urlPicsumPhotos(),
            photo_sm: faker.image.urlPicsumPhotos(),
            createdBy: {
                connect: { id: admin.id }
            }
        }
    });

    // GET ASAATIDZ
    const asaatidzs = await prisma.asaatidz.findMany();


    // SCHEDULE
    for (let i = 0; i < 10; i++) {
        const day = (i + 1).toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10);
        const random1 = Math.floor(Math.random() * 10);
        const random2 = Math.floor(Math.random() * 10);


        await prisma.itikafSchedule.create({
            data: {
                itikaf: { connect: { id: itikaf.id } },
                date: '2024-04-' + day,
                day_index: i + 1,
                description: faker.lorem.paragraphs(),
                photo: faker.image.urlLoremFlickr(),
                photo_sm: faker.image.urlLoremFlickr(),
                imam_tarawih: {
                    connect: { id: asaatidzs[random].id }
                },
                imam_qiyamul_lail: {
                    connect: { id: asaatidzs[random1].id }
                },
                ustadz_kajian: {
                    connect: { id: asaatidzs[random2].id }
                },
            }
        })
    }
    console.log('Seed: Itikaf');
}
