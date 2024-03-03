import { BlogCategory } from "src/blog_categories/blog_categories.interface"
import { User } from "src/users/users.interface"

export interface Blog {
    id: string
    title: string
    content: string
    author?: User
    authorId: string
    category?: BlogCategory
    deleted: boolean
    createdAt: Date
    updatedAt: Date
}