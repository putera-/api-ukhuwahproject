import { Blog } from "src/blogs/blogs.interface"

export interface BlogCategory {
    id: string
    title: string
    blogs?: Blog[]
    createdAt: Date
    updatedAt: Date
}