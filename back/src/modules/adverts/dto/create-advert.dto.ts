import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Fuel } from '@prisma/client';

export class CreateAdvertDto {
  @ApiProperty({
    description: 'Car brand',
    type: String,
    default: 'Ford',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    description: 'Car Model',
    type: String,
    default: 'Mustang mach 1',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'Car year',
    type: Number,
    default: 2022,
  })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Car fuel, is possible ["electric", "ethanol", "hybrid"]',
    type: Fuel,
    default: 'hybrid',
    enum: Fuel,
  })
  @IsEnum(Fuel)
  @IsNotEmpty()
  fuel: Fuel;

  @ApiProperty({
    description: 'Car km',
    type: Number,
    default: 1200.09,
  })
  @IsNotEmpty()
  km: number;

  @ApiProperty({
    description: 'Car color',
    type: String,
    default: 'Black',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    description: 'Car fipe table',
    type: Number,
    default: 95469290,
  })
  @IsInt()
  @IsNotEmpty()
  table_fipe_price: number;

  @ApiProperty({
    description: 'Car price',
    type: Number,
    default: 95469290,
  })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Car description',
    type: String,
    default:
      'this car is the fastest of its year, super economical and comfortable',
  })
  @IsString()
  description: string;

  @IsBoolean()
  is_active: boolean = true;

  @ApiProperty({
    description: 'Car image',
    type: String,
    default: 'https://imgs.com.br/image-car-mustang',
  })
  @IsString()
  image_cape: string;

  @IsOptional()
  imagesGallery: string[];
}
