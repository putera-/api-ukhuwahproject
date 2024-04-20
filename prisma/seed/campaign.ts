import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export async function campaignSeed(prisma: PrismaClient) {

    const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } });
    const members = await prisma.user.findMany({ where: { role: 'MEMBER' } });

    for (let i = 0; i < 5; i++) {
        const admin = admins[Math.floor(Math.random() * admins.length)];
        let index = 0;

        const dataCampaign: Prisma.CampaignCreateInput = {
            title: faker.lorem.words({ max: 10, min: 4 }),
            author: { connect: { id: admin.id } },
            description: faker.lorem.paragraphs(),
            target_amount: Math.floor(Math.random() * 20000000),
            due_date: dayjs().add(Math.floor(Math.random() * 60), 'days').format('YYYY-MM-DD'),
            active: true,
            photos: {
                createMany: {
                    data: [
                        {
                            path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                            path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
                            index: index++
                        },
                        {
                            path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                            path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
                            index: index++
                        },
                        {
                            path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                            path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
                            index: index++
                        },
                        {
                            path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                            path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 }),
                            index: index++
                        },
                    ]
                }
            }
        }
        const campaign = await prisma.campaign.create({ data: dataCampaign })

        // donation
        {
            for (let j = 0; j < Math.floor(Math.random() * 60); j++) {
                const member = members[Math.floor(Math.random() * members.length)];
                const paidAt = dayjs().subtract(Math.floor(Math.random() * 5), 'days').toISOString();
                const gross_amount = Math.floor(Math.random() * 2000000);

                const donation: Prisma.DonationCreateInput = {
                    Campaign: { connect: { id: campaign.id } },
                    User: { connect: { id: member.id } },
                    gross_amount,
                    status: 'settlement',
                    paidAt,

                }

                await prisma.donation.create({ data: donation })
            }

            const donations = await prisma.donation.aggregate({
                where: { campaignId: campaign.id },
                _sum: { gross_amount: true }
            });

            await prisma.campaign.update({
                where: { id: campaign.id },
                data: {
                    collected_amount: donations._sum.gross_amount
                }
            });
        }

        // like of campaign
        for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
            const like: Prisma.LikeCreateInput = {
                User: { connect: { id: members[Math.floor(Math.random() * members.length)].id } },
                Campaign: { connect: { id: campaign.id } }
            }
            await prisma.like.create({ data: like })
        }

        // create comments
        for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
            const comment = await prisma.comment.create({
                data: {
                    comment: faker.lorem.sentence(),
                    Campaign: { connect: { id: campaign.id } },
                    commenter: { connect: { id: members[Math.floor(Math.random() * members.length)].id } },
                }
            });

            // like of comments
            for (let k = 0; k < Math.floor(Math.random() * 30); k++) {
                const like: Prisma.LikeCreateInput = {
                    User: { connect: { id: members[Math.floor(Math.random() * members.length)].id } },
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
                        commenter: { connect: { id: members[Math.floor(Math.random() * members.length)].id } },
                    }
                })

                // comment likes
                for (let m = 0; m < Math.floor(Math.random() * 30); m++) {
                    const like: Prisma.LikeCreateInput = {
                        User: { connect: { id: members[Math.floor(Math.random() * members.length)].id } },
                        CommentReply: { connect: { id: reply.id } }
                    }
                    await prisma.like.create({ data: like })
                }
            }

        }
    }

}