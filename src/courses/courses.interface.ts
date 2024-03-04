import { CourseCategory } from "src/course_categories/course_categories.interface"

export interface Course {
    id: string
    title: string
    price: number
    category?: CourseCategory
    courseCategoryId: string
    status: 'DRAFT' | 'PUBLISH'
    thumbnail?: string
    thumbnail_md?: string
    deleted: boolean
    publishAt: Date
    createdAt: Date
    updatedAt: Date
}