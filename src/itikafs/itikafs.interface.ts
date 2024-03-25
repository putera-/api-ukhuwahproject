import { ItikafSchedule } from "src/itikaf_schedules/itikaf_schedules.interface"
import { Photo } from "src/photos/photos.interface"
import { User } from "src/users/users.interface"
export interface Itikaf {
    id: string
    year: string
    hijri_year: string
    description: string
    photos?: Photo[]
    contact_person_name?: string
    contact_person_phone?: string
    createdBy?: User
    userId: string
    createdAt: Date
    updatedAt: Date
    ItikafSchedule?: ItikafSchedule[]
}