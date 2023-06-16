import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AddressesRepository } from './repositories/addresses.repository';
import { AddressesPrismaRepository } from './repositories/prisma/addresses.prisma.repository';

@Module({
  controllers: [AddressesController],
  providers: [
    AddressesService,
    PrismaService,
    {
      provide: AddressesRepository,
      useClass: AddressesPrismaRepository
    }
  ]
})
export class AddressesModule {}
