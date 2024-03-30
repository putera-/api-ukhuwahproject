import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function clientSeed(prisma: PrismaClient, id: string) {
    const data = {
        id,
        name: 'Ukhuwah Project',
        nick: 'UP',
        slogan: 'Bersama Di Jalan Dakwah',
        address: 'Jl Moh Kafi 1, Ciganjur, Jagakarsa, DKI Jakarta, 12630. Indonesia',
        phone: '+62 811-1111-1111',
        logo: '/dummy/uplogo.png',
        logo_sm: '/dummy/uplogo.png',
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com'
    }

    await prisma.client.upsert({
        where: { id },
        update: data,
        create: data,
    });

    console.log('Seed: Client');
}
