export interface Blog {
    id: string
    title: string
    content: string
    clientId: string
    authorId: string
    deleted: boolean
    createdAt: Date
    updatedAt: Date
}