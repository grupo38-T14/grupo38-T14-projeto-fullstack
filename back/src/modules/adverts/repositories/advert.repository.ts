import { Prisma } from '@prisma/client';
import { CreateAdvertDto } from '../dto/create-advert.dto';
import { UpdateAdvertDto } from '../dto/update-advert.dto';
import { Advert } from '../entities/advert.entity';
import { PaginatedResult } from '../providers/prisma/paginator';

export abstract class AdvertRepository {
  abstract create(
    data: CreateAdvertDto,
    user_id: string,
  ): Promise<Advert> | Advert;
  abstract findAll({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<Advert[]>>;
  abstract findAllAdverts(): Promise<Advert[]> | Advert[];
  abstract findOne(id: string): Promise<Advert> | Advert;
  abstract update(id: string, data: UpdateAdvertDto): Promise<Advert> | Advert;
  abstract delete(id: string): Promise<void>;
}
