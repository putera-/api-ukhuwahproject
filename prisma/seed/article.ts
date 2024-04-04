import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export async function articleSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);

    const members = await prisma.user.findMany({
        where: {
            role: 'MEMBER'
        }
    })

    for (let i = 0; i < 20; i++) {
        const admin: Prisma.UserCreateInput = {
            email: `admin${i}@gmail.com`,
            name: faker.person.fullName(),
            phone: '+62 812-1111-1111',
            password,
            role: 'ADMIN',
            avatar: faker.image.avatar(),
            avatar_md: faker.image.avatar()
        };

        const user = await prisma.user.create({
            data: admin
        });

        for (let h = 0; h < Math.floor(Math.random() * 10); h++) {


            const article = await prisma.article.create({
                data: {
                    title: faker.lorem.words({ max: 10, min: 4 }),
                    content: faker.lorem.paragraphs(),
                    status: 'PUBLISH',
                    photos: {
                        createMany: {
                            data: [
                                {
                                    path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                                    path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 })
                                },
                                {
                                    path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                                    path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 })
                                },
                                {
                                    path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                                    path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 })
                                },
                                {
                                    path: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                                    path_md: faker.image.urlPicsumPhotos({ width: 1280, height: 720 })
                                },
                            ]
                        }
                    },
                    author: { connect: { id: user.id } }
                }
            })


            for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
                const like: Prisma.LikeCreateInput = {
                    User: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                    Article: { connect: { id: article.id } }
                }
                await prisma.like.create({ data: like })
            }

            // const comments: Prisma.ArticleCommentCreateInput[] = [];
            for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
                const comment = await prisma.comment.create({
                    data: {
                        comment: faker.lorem.sentence(),
                        Article: { connect: { id: article.id } },
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
    }

    console.log('Seed: Article');
}
