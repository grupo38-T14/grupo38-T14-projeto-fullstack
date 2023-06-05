import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { AdvertRepository } from './repositories/advert.repository';

@Injectable()
export class AdvertsService {
  constructor(private advertRepository: AdvertRepository) {}

  async create(createAdvertDto: CreateAdvertDto) {
    return 'This action adds a new advert';
  }

  async findAll() {
    const advertList = await this.advertRepository.findAll()
    return advertList
  }

  async findOne(id: string) {
    return `This action returns a #${id} advert`;
  }

  async update(id: string, updateAdvertDto: UpdateAdvertDto) {
    const findAdvert = await this.advertRepository.findOne(id)
    if(!findAdvert){
      throw new NotFoundException("Advert not found")
    }

    const advertUpdate = await this.advertRepository.update(id, updateAdvertDto)

    return advertUpdate
  }

  async remove(id: string) {
    return `This action removes a #${id} advert`;
  }
}
