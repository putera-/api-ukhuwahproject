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
}