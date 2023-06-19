import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressesRepository } from './repositories/addresses.repository';


@Injectable()
export class AddressesService {
  constructor(private addressesRepository: AddressesRepository) {}

  async update(id: string, updateAddressDto: UpdateAddressDto, userId: string) {
    const isUser = await this.addressesRepository.findOne(id, userId)
    if (!isUser) {
      throw new NotFoundException("Address not found.")
    }

    const newAddress = await this.addressesRepository.update(id, updateAddressDto)

    return newAddress;
  }
}
