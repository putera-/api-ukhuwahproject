import { Course } from "src/courses/courses.interface"

export interface CourseCategory {
    id: string
    title: string
    courses?: Course[]
    createdAt: Date
    updatedAt: Date
}