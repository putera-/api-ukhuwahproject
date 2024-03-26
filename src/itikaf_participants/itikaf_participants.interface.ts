import { ItikafSchedule } from "src/itikaf_schedules/itikaf_schedules.interface"
import { User } from "src/users/users.interface"

export interface ItikafParticipant {
    id: string
    user?: User
    userId: string
    schedule?: ItikafSchedule
    scheduleId: string
    total_member: number
    man: number
    woman: number
    vehicle?: Vehicle
    vehicleId?: string
    participate: boolean
    unparticipate_reason?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface Vehicle {
    id: string
    user?: User
    userId: string
    vehicle_type?: 'Motor' | 'Mobil'
    vehicle_no?: string
    createdAt?: Date
    updatedAt?: Date
    ItikafParticipant?: ItikafParticipant[]
}