import { Itikaf } from "src/itikafs/itikafs.interface"
import { ItikafParticipant } from "src/itikaf_participants/itikaf_participants.interface"
import { Asaatidz } from "src/asaatidzs/asaatidzs.interface"
import { Comment } from "src/comments/comments.interface"
import { Like } from "src/likes/likes.interface"

export interface ItikafSchedule {
    id: string
    itikaf?: Itikaf
    itikafId: string
    date: string
    day_index: number
    description: string
    photo?: string
    photo_sm?: string
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
    likes?: Like[]
    comments?: Comment[]
    _count?: {
        likes?: number
        comments?: number
    }
}