import { Blog } from "src/blogs/blogs.interface"

export interface Photo {
    id: string
    path: string
    path_md: string
    index: number
    blog?: Blog
    blogId: string
}