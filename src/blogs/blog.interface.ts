import { User } from "src/users/user.interface"

export interface Blog {
    id: string
    title: string
    content: string
    clientId: string
    author?: User
    authorId: string
    deleted: boolean
    createdAt: Date
    updatedAt: Date
}