import { PrismaService } from 'src/database/prisma.service';
import { UpdateAddressDto } from '../../dto/update-address.dto';
import { Address } from '../../entities/address.entity';
import { AddressesRepository } from '../addresses.repository';
import { plainToInstance } from 'class-transformer';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AddressesPrismaRepository implements AddressesRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string, userId: string): Promise<Address> {
    const address = await this.prisma.address.findUnique({
        where: {id}
    })

    if (address && address.userId !== userId) {
      throw new ForbiddenException('Insufficient permission');
    }
    return plainToInstance(Address, address);
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const newAddress = await this.prisma.address.update({
      where: { id },
      data: { ...updateAddressDto },
    });
    return plainToInstance(Address, newAddress);
  }
}
