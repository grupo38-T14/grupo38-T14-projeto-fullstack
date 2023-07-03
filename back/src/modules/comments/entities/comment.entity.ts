import { randomUUID } from "crypto"

export class Comment {
    readonly id: string
    readonly created_at: string
    readonly userId: string
    readonly advertId: string

    comment: string
}
