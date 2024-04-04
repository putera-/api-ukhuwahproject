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

    // GET ASAATIDZ
    const asaatidzs = await prisma.asaatidz.findMany();

    // GET MEMBERS
    const members = await prisma.user.findMany({
        where: {
            role: 'MEMBER'
        }
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


    // create itikaf likes
    for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
        const like: Prisma.LikeCreateInput = {
            User: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
            Itikaf: { connect: { id: itikaf.id } }
        }
        await prisma.like.create({ data: like })
    }

    // create comments of itikaf
    // create comments
    for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
        const comment = await prisma.comment.create({
            data: {
                comment: faker.lorem.sentence(),
                Itikaf: { connect: { id: itikaf.id } },
                commenter: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
            }
        });

        // like of comments
        for (let k = 0; k < Math.floor(Math.random() * 30); k++) {
            const like: Prisma.LikeCreateInput = {
                User: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                Comment: { connect: { id: comment.id } }
            }
            await prisma.like.create({ data: like })
        }


        // comment reply
        for (let l = 0; l < Math.floor(Math.random() * 10); l++) {
            const reply = await prisma.commentReply.create({
                data: {
                    comment: faker.lorem.sentence(),
                    Comment: { connect: { id: comment.id } },
                    commenter: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                }
            })

            // comment likes
            for (let m = 0; m < Math.floor(Math.random() * 30); m++) {
                const like: Prisma.LikeCreateInput = {
                    User: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                    CommentReply: { connect: { id: reply.id } }
                }
                await prisma.like.create({ data: like })
            }
        }
    }


    // SCHEDULE
    for (let i = 0; i < 10; i++) {
        const day = (i + 1).toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10);
        const random1 = Math.floor(Math.random() * 10);
        const random2 = Math.floor(Math.random() * 10);


        const schedule = await prisma.itikafSchedule.create({
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
        });

        // create schedule likes
        for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
            const like: Prisma.LikeCreateInput = {
                User: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                ItikafSchedule: { connect: { id: schedule.id } }
            }
            await prisma.like.create({ data: like })
        }

        // create comments of schedule
        // create comments
        for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
            const comment = await prisma.comment.create({
                data: {
                    comment: faker.lorem.sentence(),
                    ItikafSchedule: { connect: { id: schedule.id } },
                    commenter: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                }
            });

            // like of comments
            for (let k = 0; k < Math.floor(Math.random() * 30); k++) {
                const like: Prisma.LikeCreateInput = {
                    User: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                    Comment: { connect: { id: comment.id } }
                }
                await prisma.like.create({ data: like })
            }


            // comment reply
            for (let l = 0; l < Math.floor(Math.random() * 10); l++) {
                const reply = await prisma.commentReply.create({
                    data: {
                        comment: faker.lorem.sentence(),
                        Comment: { connect: { id: comment.id } },
                        commenter: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                    }
                })

                // comment likes
                for (let m = 0; m < Math.floor(Math.random() * 30); m++) {
                    const like: Prisma.LikeCreateInput = {
                        User: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                        CommentReply: { connect: { id: reply.id } }
                    }
                    await prisma.like.create({ data: like })
                }
            }

        }
    }
    console.log('Seed: Itikaf');
}
