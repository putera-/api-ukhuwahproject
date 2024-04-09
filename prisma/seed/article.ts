import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const youtubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const youtubeRandom = [
    'https://youtu.be/z2dre308hdo?si=2UW9dqJETzrHtoSk',
    'https://www.youtube.com/watch?v=1lhOAXC6ZGU&list=RDz2dre308hdo&index=2&pp=8AUB',
    'https://www.youtube.com/watch?v=btMOf1VFIqQ&list=RDz2dre308hdo&index=3&pp=8AUB',
    'https://www.youtube.com/watch?v=0MawgrUoPFU&list=RDz2dre308hdo&index=5&pp=8AUB',
    'https://www.youtube.com/watch?v=6ygVrVqC7as&list=RDz2dre308hdo&index=6&pp=8AUB',
    'https://www.youtube.com/watch?v=GpDQvDjm6E4&list=RDz2dre308hdo&index=7&pp=8AUB',
    'https://www.youtube.com/watch?v=j4cGkfKt1xE&list=RDz2dre308hdo&index=8&pp=8AUB',
    'https://www.youtube.com/watch?v=t-pCEQp2Y4I&list=RDz2dre308hdo&index=11&pp=8AUB',
    'https://www.youtube.com/watch?v=rM5THSRxiK8&list=RDz2dre308hdo&index=13&pp=8AUB',
    'https://www.youtube.com/watch?v=0RhbJ4Thlto&list=RDz2dre308hdo&index=16&pp=8AUB'
]

export async function articleSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);

    const members = await prisma.user.findMany({
        where: {
            role: 'MEMBER'
        }
    });

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

        // create article
        for (let h = 0; h < Math.floor(Math.random() * 20); h++) {
            const data: Prisma.ArticleCreateInput = {
                title: faker.lorem.words({ max: 10, min: 4 }),
                status: 'PUBLISH',
                author: { connect: { id: user.id } }
            };
            if ((Math.floor(Math.random() * 10)) % 2 == 0) {
                data.content = faker.lorem.paragraphs()
            }

            if ((Math.floor(Math.random() * 10)) % 2 == 0) {
                let index = 0;
                data.photos = {
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
            } else {
                const y = youtubeRandom[Math.floor(Math.random() * 10)];
                data.youtubeId = y.match(youtubeUrlRegex)[1];
            }

            const article = await prisma.article.create({
                data
            });


            // like of article
            for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
                const like: Prisma.LikeCreateInput = {
                    User: { connect: { id: members[Math.floor(Math.random() * 20)].id } },
                    Article: { connect: { id: article.id } }
                }
                await prisma.like.create({ data: like })
            }

            // create comments
            for (let j = 0; j < Math.floor(Math.random() * 30); j++) {
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
    }

    console.log('Seed: Article');
}
