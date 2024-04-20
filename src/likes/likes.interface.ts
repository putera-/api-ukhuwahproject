import { Article } from "src/articles/articles.interface"
import { Campaign } from "src/campaigns/campaigns.interface"
import { CommentReply } from "src/comments/comments.interface"
import { ItikafSchedule } from "src/itikaf_schedules/itikaf_schedules.interface"
import { Itikaf } from "src/itikafs/itikafs.interface"
import { User } from "src/users/users.interface"

export interface Like {
    user?: User
    userId: string
    Article?: Article
    articleId?: string
    Comment?: Comment
    commentId?: string
    CommentReply?: CommentReply
    commentReplyId?: string
    ItikafSchedule?: ItikafSchedule
    itikafScheduleId?: string
    Itikaf?: Itikaf
    itikafId?: string
    Campaign?: Campaign
    campaignId?: string
    createdAt: Date
}
