import { Blog } from "@prisma/client"
import { Client } from "../clients/client.interface"
import { Auth } from "src/auth/auth.interface"

export interface User {
    id: string
    name: string
    email: string
    password?: string
    auth?: Auth[]
    clientId?: string
    Client?: Client
    blogs?: Blog[]
    role: 'SUPERUSER' | 'ADMIN' | 'MEMBER'
    deleted: boolean
    createdAt?: Date
    updatedAt?: Date
}