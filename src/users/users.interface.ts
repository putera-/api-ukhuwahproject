import { Auth } from "src/auth/auth.interface"
import { Article } from "src/articles/articles.interface"
import { UserRole } from "@prisma/client"

export interface User {
    id: string
    name: string
    email?: string
    phone?: string
    password?: string
    auth?: Auth[]
    articles?: Article[]
    role?: UserRole
    avatar?: string
    avatar_md?: string
    active?: boolean
    createdAt?: Date
    updatedAt?: Date
}