import { Comment } from "src/comments/comments.interface"
import { Like } from "src/likes/likes.interface"
import { Photo } from "src/photos/photos.interface"
import { User } from "src/users/users.interface"

export interface MidtransCallback {
    id: string
    Transaction?: Transaction
    transactionId: string
    callback_data: string
    createdAt: Date
}

export interface Transaction {
    id: string
    Donation?: Donation
    donationId: string
    gross_amount: number
    midtransToken?: string
    status: string
    paidAt?: Date
    createdAt: Date
    updatedAt: Date
    MidtransCallback?: MidtransCallback
}
export interface Donation {
    id: string
    Campaign?: Campaign
    campaignId: string
    User?: User
    userId: string
    gross_amount: number
    status: string
    paidAt?: Date
    createdAt: Date
    updatedAt: Date
    Transaction?: Transaction
}

export interface Campaign {
    id: string
    title: string
    description: string
    target_amount: number
    collected_amount: number
    due_date: string
    photos?: Photo[]
    author?: User
    userId: string
    publishedAt: Date
    active: boolean
    createdAt: Date
    updatedAt: Date
    donations?: Donation[]
    likes?: Like[]
    comments?: Comment[]
}
