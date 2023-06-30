import { Module } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AdvertRepository } from './repositories/advert.repository';
import { AdvertPrismaRepository } from './repositories/prisma/adverts.prisma.repository';

@Module({
  controllers: [AdvertsController],
  providers: [
    AdvertsService,
    PrismaService,
    { provide: AdvertRepository, useClass: AdvertPrismaRepository },
  ],
  exports: [AdvertsService]
})
export class AdvertsModule {}
