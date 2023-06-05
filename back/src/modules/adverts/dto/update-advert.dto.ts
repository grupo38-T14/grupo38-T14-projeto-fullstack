import { PartialType } from '@nestjs/swagger';
import { CreateAdvertDto } from './create-advert.dto';
import { Fuel } from '../entities/advert.entity';

export class UpdateAdvertDto extends PartialType(CreateAdvertDto) {}
