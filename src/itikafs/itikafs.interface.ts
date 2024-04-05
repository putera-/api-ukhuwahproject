import { Comment } from "src/comments/comments.interface"
import { ItikafSchedule } from "src/itikaf_schedules/itikaf_schedules.interface"
import { Like } from "src/likes/likes.interface"
import { User } from "src/users/users.interface"

export interface Itikaf {
    id: string
    year: string
    hijri_year: string
    description: string
    photo?: string
    photo_sm?: string
    contact_person_name?: string
    contact_person_phone?: string
    masjid?: string
    address?: string
    createdBy?: User
    userId: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    schedules?: ItikafSchedule[]
    likes?: Like[]
    comments?: Comment[]
    _count?: {
        likes?: number
        comments?: number
    }
}