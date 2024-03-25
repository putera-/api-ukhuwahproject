import { Photo } from "src/photos/photos.interface"
import { Itikaf } from "src/itikafs/itikafs.interface"
export interface ItikafSchedule {
    id: string
    itikaf?: Itikaf
    itikafId: string
    date: string
    day_index: number
    description: string
    photos?: Photo[]
    deleted: boolean
    createdAt: Date
    updatedAt: Date
}