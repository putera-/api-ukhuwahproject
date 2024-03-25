import { Photo } from "src/photos/photos.interface"
import { Itikaf } from "src/itikafs/itikafs.interface"
export interface ItikafSchedule {
    id: string
    itikaf?: Itikaf
    itikafId: string
    date: Date
    day_index: number
    description: string
    photos: Photo[]
    createdAt: Date
    updatedAt: Date
}