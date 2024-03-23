import { User } from "src/users/users.interface"

export interface Auth {
    id: string
    user: User
    userId: string
    token: string
    expiredAt: Date
    path: string
    method: string
    createdAt: Date
}