import { Like } from "src/app.interface"
import { Photo } from "src/photos/photos.interface"
import { User } from "src/users/users.interface"

export interface Article {
    id: string
    title: string
    content: string
    author?: User
    authorId: string
    photos?: Photo[]
    status: 'DRAFT' | 'PUBLISH'
    deleted: boolean
    publishedAt: Date
    createdAt: Date
    updatedAt: Date
    likes?: Like[]
    comments?: ArticleComment[]
}

export interface ArticleComment {
    id: string
    commenter?: User
    userId: string
    Article?: Article
    articleId: string
    comment: string
    createdAt: Date
    updatedAt: Date
    like?: Like[]
}

export interface ArticleCommentReply {
    id: string
    commenter?: User
    userId: string
    comment: string
    createdAt: Date
    updatedAt: Date
    like?: Like[]
    ArticleComment?: ArticleComment
    articleCommentId: string
}