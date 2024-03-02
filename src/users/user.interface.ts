import { Blog } from "@prisma/client"
import { Auth } from "src/auth/auth.interface"

export interface User {
    id: string
    name: string
    email: string
    password?: string
    auth?: Auth[]
    blogs?: Blog[]
    role: 'SUPERUSER' | 'ADMIN' | 'STAFF' | 'MEMBER'
    deleted: boolean
    createdAt?: Date
    updatedAt?: Date
}