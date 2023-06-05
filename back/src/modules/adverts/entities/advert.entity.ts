import { randomUUID } from "crypto";

export enum Fuel {
    ELECTRIC = 'ELECTRIC',
    ETHANOL = 'ETHANOL',
    HYBRID = 'HYBRID'
}

export class Advert {
    readonly id: string;
    brand: string;
    model: string;
    year: number;
    fuel: Fuel;
    km: number;
    color: string;
    table_fipe_price: number;
    price: number;
    description: string;
    image_cape: string;

    constructor() {
        this.id = randomUUID()
    }
}
