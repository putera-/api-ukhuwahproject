import { Photo } from "src/photos/photos.interface"
import { Itikaf } from "src/itikafs/itikafs.interface"
import { ItikafParticipant } from "src/itikaf_participants/itikaf_participants.interface"

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
    participants?: ItikafParticipant[]
}