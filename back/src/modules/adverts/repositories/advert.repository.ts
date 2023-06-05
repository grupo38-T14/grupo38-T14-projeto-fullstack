import { CreateAdvertDto } from "../dto/create-advert.dto";
import { UpdateAdvertDto } from "../dto/update-advert.dto";
import { Advert } from "../entities/advert.entity";

export abstract class AdvertRepository {
    abstract create(data: CreateAdvertDto): Promise<Advert> | Advert
    abstract findAll(): Promise<Advert[]> | Advert
    abstract findOne(id: string): Promise<Advert> | Advert
    abstract update(id: string, data: UpdateAdvertDto): Promise<Advert> | Advert
}