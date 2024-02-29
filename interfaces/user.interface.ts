import { Blog } from "@prisma/client"
import { Auth } from "./auth.interface"
import { Client } from "./client.interface"

export interface User {
    id: string
    name: string
    email: string
    password?: string
    auth?: Auth[]
    clientId?: string
    Client?: Client
    blogs?: Blog[]
    role: 'SUPERADMIN' | 'CLIENT' | 'MEMBER'
    deleted: boolean
    createdAt?: Date
    updatedAt?: Date
}