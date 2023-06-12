import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { Fuel, Prisma } from '@prisma/client';

@Controller('adverts')
export class AdvertsController {
  constructor(private readonly advertsService: AdvertsService) {}

  @Post()
  create(@Body() createAdvertDto: CreateAdvertDto) {
    return this.advertsService.create(createAdvertDto);
  }

  @Get()
  findAll(
    @Query('orderBy') orderBy?: Prisma.AdvertOrderByWithRelationInput,
    @Query('page') page?: number,
    @Query('brand') brand?: string,
    @Query('model') model?: string,
    @Query('color') color?: string,
    @Query('year') year?: number,
    @Query('fuel') fuel?: Fuel,
    @Query('maxPrice') maxPrice?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxKM') maxKM?: number,
    @Query('minKM') minKM?: number,
  ) {
    return this.advertsService.findAll(
      {
        brand,
        color,
        fuel,
        model,
        year,
        price: { lte: maxPrice, gte: minPrice },
        km: { lte: maxKM, gte: minKM },
      },
      orderBy,
      page,
    );
  }

  @Get('/all')
  findAllAdverts() {
    return this.advertsService.findAllAdverts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertDto: UpdateAdvertDto) {
    return this.advertsService.update(id, updateAdvertDto);
  }
}
