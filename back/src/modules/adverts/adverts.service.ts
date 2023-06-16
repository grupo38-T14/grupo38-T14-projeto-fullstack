import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { AdvertRepository } from './repositories/advert.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdvertsService {
  constructor(private advertRepository: AdvertRepository) {}

  async create(createAdvertDto: CreateAdvertDto, user_id: string) {
    return await this.advertRepository.create(createAdvertDto, user_id);
  }

  async findAll(
    where?: Prisma.AdvertWhereInput,
    orderBy?: Prisma.UsersOrderByWithRelationInput,
    page?: number,
  ) {
    const advertList = await this.advertRepository.findAll({
      where,
      orderBy,
      page,
    });
    return advertList;
  }
  async findAllAdverts() {
    const advertList = await this.advertRepository.findAllAdverts();
    return advertList;
  }

  async findOne(id: string) {
    const findAdvert = await this.advertRepository.findOne(id);
    if (!findAdvert) {
      throw new NotFoundException('Advert not found!');
    }
    return findAdvert;
  }

  async update(id: string, updateAdvertDto: UpdateAdvertDto) {
    const findAdvert = await this.advertRepository.findOne(id);
    if (!findAdvert) {
      throw new NotFoundException('Advert not found');
    }

    const advertUpdate = await this.advertRepository.update(
      id,
      updateAdvertDto,
    );

    return advertUpdate;
  }

  async remove(id: string) {
    const advert = await this.advertRepository.findOne(id);
    if (!advert) {
      throw new NotFoundException('Advert not found');
    }
    await this.advertRepository.delete(id);
  }
}
