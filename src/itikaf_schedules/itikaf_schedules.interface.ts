import { Photo } from "src/photos/photos.interface"
import { Itikaf } from "src/itikafs/itikafs.interface"
import { ItikafParticipant } from "src/itikaf_participants/itikaf_participants.interface"
import { Asaatidz } from "src/asaatidzs/asaatidzs.interface"

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
    imam_tarawih?: Asaatidz
    imam_tarawih_id?: String
    imam_qiyamul_lail?: Asaatidz
    imam_qiyamul_lail_id?: String
    ustadz_kajian?: Asaatidz
    ustadz_kajian_id?: String,
    total_member?: number
    total_man?: number
    total_woman?: number
    auth_participant?: boolean
}