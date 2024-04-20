import { Article } from "src/articles/articles.interface"
import { Campaign } from "src/campaigns/campaigns.interface"
import { ItikafSchedule } from "src/itikaf_schedules/itikaf_schedules.interface"
import { Itikaf } from "src/itikafs/itikafs.interface"
import { Like } from "src/likes/likes.interface"
import { User } from "src/users/users.interface"

export interface Comment {
    id: string
    commenter?: User
    userId: string
    comment: string
    createdAt?: Date
    updatedAt?: Date
    like?: Like[]
    replies?: CommentReply[]
    Article?: Article
    articleId?: string
    Itikaf?: Itikaf
    itikafId?: string
    Campaign?: Campaign
    campaignId?: string
    ItikafSchedule?: ItikafSchedule
    itikafScheduleId?: string
    _count?: {
        likes?: number
        comments?: number
    }
}

export interface CommentReply {
    id: string
    commenter?: User
    userId: string
    comment: string
    createdAt?: Date
    updatedAt?: Date
    like?: Like[]
    Comment?: Comment
    commentId: string
    _count?: {
        likes?: number
        comments?: number
    }
}
