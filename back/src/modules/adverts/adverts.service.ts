import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { AdvertRepository } from './repositories/advert.repository';

@Injectable()
export class AdvertsService {
  constructor(private advertRepository: AdvertRepository) {}

  async create(createAdvertDto: CreateAdvertDto) {
    return await this.advertRepository.create(createAdvertDto)
  }

  async findAll() {
    const advertList = await this.advertRepository.findAll()
    return advertList
  }

  async findOne(id: string) {
    const findAdvert = this.advertRepository.findOne(id);
    if(!findAdvert){
      throw new NotFoundException('Advert not found!')
    }
    return findAdvert
  }

  async update(id: string, updateAdvertDto: UpdateAdvertDto) {
    const findAdvert = await this.advertRepository.findOne(id)
    if(!findAdvert){
      throw new NotFoundException("Advert not found")
    }

    const advertUpdate = await this.advertRepository.update(id, updateAdvertDto)

    return advertUpdate
  }
}
