import { Article, ArticleComment, ArticleCommentReply } from "./articles/articles.interface"
import { ItikafSchedule } from "./itikaf_schedules/itikaf_schedules.interface"
import { User } from "./users/users.interface"

export interface Pagination<T> {
    data: T
    total: number
    page: number
    limit: number
    maxPage: number
}

export interface Like {
    user?: User
    userId: string
    Article?: Article
    articleId?: string
    ArticleComment?: ArticleComment
    articleCommentId?: string
    ArticleCommentReply?: ArticleCommentReply
    articleCommentReplyId?: string
    ItikafSchedule?: ItikafSchedule
    itikafScheduleId?: string
    createdAt: Date
}