import { Article } from "src/articles/articles.interface"

export interface Photo {
    id: string
    path: string
    path_md: string
    index: number
    article?: Article
    articleId: string
}