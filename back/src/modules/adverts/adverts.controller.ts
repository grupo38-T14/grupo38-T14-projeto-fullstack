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
import { Prisma } from '@prisma/client';

@Controller('adverts')
export class AdvertsController {
  constructor(private readonly advertsService: AdvertsService) {}

  @Post()
  create(@Body() createAdvertDto: CreateAdvertDto) {
    return this.advertsService.create(createAdvertDto);
  }

  @Get()
  findAll(
    @Query('where') where?: Prisma.UsersWhereInput,
    @Query('orderBy') orderBy?: Prisma.UsersOrderByWithRelationInput,
    @Query('page') page?: number,
  ) {
    return this.advertsService.findAll(where, orderBy, page);
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
