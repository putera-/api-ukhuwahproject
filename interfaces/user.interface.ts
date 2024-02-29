import { Blog } from "@prisma/client"
import { Auth } from "./auth.interface"

export interface User {
    id: string
    name: string
    email: string
    password: string
    auth?: Auth[]
    clientId: string
    blogs?: Blog[]
    role: 'SUPERADMIN' | 'CLIENT' | 'MEMBER'
    deleted: boolean
    createdAt: Date
    updatedAt: Date
}