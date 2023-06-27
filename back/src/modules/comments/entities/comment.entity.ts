import { randomUUID } from "crypto"

export class Comment {
    readonly id: string
    readonly created_at: string

    comment: string

    // constructor() {
    //     this.id = randomUUID(),
    //     this.created_at = new Date().toISOString()
    // }
}
