import { Injectable } from '@nestjs/common';
import { AdvertRepository } from '../advert.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAdvertDto } from '../../dto/create-advert.dto';
import { Advert } from '../../entities/advert.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateAdvertDto } from '../../dto/update-advert.dto';

@Injectable()
export class AdvertPrismaRepository implements AdvertRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAdvertDto): Promise<Advert> {
    const advert = new Advert()
    Object.assign(advert, {
        ...data
    })
    const newAdvert = await this.prisma.advert.create({
        data: {...advert}
    })
    return plainToInstance(Advert, newAdvert);
  }

  async findAll(): Promise<Advert[]> {
    const adverts = await this.prisma.advert.findMany({
      include: {
        galerry: true,
        comments: true,
        user: true,
      },
    });

    return plainToInstance(Advert, adverts);
  }

  async findOne(id: string): Promise<Advert> {
    const advert = await this.prisma.advert.findUnique({
        where: {id},
        include: {
            galerry: true,
            comments: true,
            user: true,
          },
    })
    return plainToInstance(Advert, advert);
  }

  async update(id: string, data: UpdateAdvertDto): Promise<Advert> {
    const advert = await this.prisma.advert.update({
      where: { id },
      data: { ...data },
      include: {
        galerry: true,
        comments: true,
        user: true,
      },
    });
    return;
  }
}
