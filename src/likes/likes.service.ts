import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { Like } from './likes.interface';

@Injectable()
export class LikesService {
    constructor(
        private prisma: PrismaService,
    ) { }
    // create(createLikeDto: CreateLikeDto) {
    //   return 'This action adds a new like';
    // }

    // findAll() {
    //   return `This action returns all likes`;
    // }

    // findOne(id: number) {
    //   return `This action returns a #${id} like`;
    // }

    // update(id: number, updateLikeDto: UpdateLikeDto) {
    //   return `This action updates a #${id} like`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} like`;
    // }

    // LIKE

    // like itikaf
    async likeItikaf(itikafId: string, userId: string): Promise<Like> {
        const find = await this.prisma.like.findFirst({
            where: { itikafId, userId }
        });
        if (find) return find;

        return this.prisma.like.create({
            data: { itikafId, userId }
        });
    }

    // like itikaf schedule
    async likeItikafSchedule(itikafScheduleId: string, userId: string): Promise<Like> {
        const find = await this.prisma.like.findFirst({
            where: { itikafScheduleId, userId }
        });
        if (find) return find;

        return this.prisma.like.create({
            data: { itikafScheduleId, userId }
        });

        return;
    }

    // like article
    async likeArticle(articleId: string, userId: string): Promise<Like> {
        const find = await this.prisma.like.findFirst({
            where: { articleId, userId }
        });
        if (find) return find;

        return this.prisma.like.create({
            data: { articleId, userId }
        });

        return;
    }

    // like campaign
    async likeCampaign(campaignId: string, userId: string): Promise<Like> {
        const find = await this.prisma.like.findFirst({
            where: { campaignId, userId }
        });
        if (find) return find;

        return this.prisma.like.create({
            data: { campaignId, userId }
        });

        return;
    }

    // like comment
    async likeComment(commentId: string, userId: string): Promise<Like> {
        const find = await this.prisma.like.findFirst({
            where: { commentId, userId }
        });
        if (find) return find;

        return this.prisma.like.create({
            data: { commentId, userId }
        });

        return;
    }

    // like comment reply
    async likeCommentReply(commentReplyId: string, userId: string): Promise<Like> {
        const find = await this.prisma.like.findFirst({
            where: { commentReplyId, userId }
        });
        if (find) return find;

        return this.prisma.like.create({
            data: { commentReplyId, userId }
        });

        return;
    }

    // DISLIKE

    // disLike itikaf
    async disLikeItikaf(itikafId: string, userId: string): Promise<void> {
        try {
            await this.prisma.like.deleteMany({
                where: { itikafId, userId }
            });
            return;
        } catch (error) {
        }
    }

    // disLike itikaf schedule
    async disLikeItikafSchedule(itikafScheduleId: string, userId: string): Promise<void> {
        try {
            await this.prisma.like.deleteMany({
                where: { itikafScheduleId, userId }
            });
            return;
        } catch (error) {
        }
    }

    // disLike article
    async disLikeArticle(articleId: string, userId: string): Promise<void> {
        try {
            await this.prisma.like.deleteMany({
                where: { articleId, userId }
            });
            return;
        } catch (error) {
        }
    }

    // disLike campaign
    async disLikeCampaign(campaignId: string, userId: string): Promise<void> {
        try {
            await this.prisma.like.deleteMany({
                where: { campaignId, userId }
            });
            return;
        } catch (error) {
        }
    }

    // disLike itikaf schedule
    async disLikeComment(commentId: string, userId: string): Promise<void> {
        try {
            await this.prisma.like.deleteMany({
                where: { commentId, userId }
            });
            return;
        } catch (error) {
        }
    }

    // disLike itikaf schedule
    async disLikeCommentReply(commentReplyId: string, userId: string): Promise<void> {
        try {
            await this.prisma.like.deleteMany({
                where: { commentReplyId, userId }
            });
            return;
        } catch (error) {
        }
    }
}
