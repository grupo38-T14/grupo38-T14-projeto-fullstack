import {
    IsString,
    IsNotEmpty,
    MaxLength,
    IsInt,
    IsEnum,
    IsDecimal,
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
  @MaxLength(127)
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    description: 'Car Model',
    type: String,
    default: 'Mustang mach 1',
  })
  @IsString()
  @MaxLength(127)
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'Car year',
    type: Number,
    default: 2022,
  })
  @IsInt()
  @MaxLength(4)
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Car fuel, is possible ["electric", "ethanol", "hybrid"]',
    type: Fuel,
    default: 'hybrid',
  })
  @IsString()
  @IsEnum(Fuel)
  @IsNotEmpty()
  fuel: Fuel;

  @ApiProperty({
    description: 'Car km',
    type: Number,
    default: 1200.09,
  })
  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  km: number;

  @ApiProperty({
    description: "Car color",
    type: String,
    default: "Black",
  })
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    description: "Car fipe table",
    type: Number,
    default: 95469290,
  })
  @IsInt()
  @MaxLength(8)
  @IsNotEmpty()
  table_fipe_price: number;

  @ApiProperty({
    description: "Car price",
    type: Number,
    default: 95469290,
  })
  @IsInt()
  @MaxLength(8)
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: "Car description",
    type: String,
    default: "this car is the fastest of its year, super economical and comfortable",
  })
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    description: "Car image",
    type: String,
    default: "https://imgs.com.br/image-car-mustang",
  })
  @IsString()
  image_cape: string;
}
