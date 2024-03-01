import { Blog } from "@prisma/client"
import { User } from "../users/user.interface"

export interface Client {
    id: string
    name: string
    users?: User[]
    blogs?: Blog[]
    deleted: boolean
    createdAt: Date
    updatedAt: Date
}