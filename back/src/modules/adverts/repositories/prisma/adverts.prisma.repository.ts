import { Injectable } from '@nestjs/common';
import { AdvertRepository } from '../advert.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAdvertDto } from '../../dto/create-advert.dto';
import { Advert } from '../../entities/advert.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateAdvertDto } from '../../dto/update-advert.dto';
import { Prisma } from '@prisma/client';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from '../../providers/prisma/paginator';

const paginate: PaginateFunction = paginator({ perPage: 12 });

@Injectable()
export class AdvertPrismaRepository implements AdvertRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAdvertDto): Promise<Advert> {
    const advert = new Advert();
    Object.assign(advert, {
      ...data,
    });
    const newAdvert = await this.prisma.advert.create({
      data: { ...advert },
    });
    return newAdvert;
  }

  async findAll({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<Advert[]>> {
    return paginate(
      this.prisma.advert,
      {
        where,
        orderBy,
      },
      {
        page,
      },
    );
  }

  async findOne(id: string): Promise<Advert> {
    const advert = await this.prisma.advert.findUnique({
      where: { id },
      include: {
        gallery: true,
        comments: true,
        user: true,
      },
    });
    return plainToInstance(Advert, advert);
  }

  async update(id: string, data: UpdateAdvertDto): Promise<Advert> {
    const advert = await this.prisma.advert.update({
      where: { id },
      data: { ...data },
      include: {
        gallery: true,
        comments: true,
        user: true,
      },
    });
    return;
  }
}
