import { Auth } from "src/auth/auth.interface"
import { Blog } from "src/blogs/blogs.interface"

export interface User {
    id: string
    name: string
    email: string
    password?: string
    auth?: Auth[]
    blogs?: Blog[]
    role: 'SUPERUSER' | 'ADMIN' | 'STAFF' | 'MEMBER'
    avatar?: string
    avatar_md?: string
    deleted: boolean
    createdAt?: Date
    updatedAt?: Date
}