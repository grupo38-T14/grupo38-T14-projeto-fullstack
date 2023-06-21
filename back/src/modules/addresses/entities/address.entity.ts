import { randomUUID } from "crypto"

export class Address {
    readonly id: string
    readonly created_at: string

    cep: string
    state: string
    city: string
    street: string
    number: string
    complement: string

    constructor() {
        this.id = randomUUID(),
        this.created_at = new Date().toISOString()
    }
}
