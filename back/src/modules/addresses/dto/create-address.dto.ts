import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    default: '12345678',
    description: 'String of numbers',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  cep: string;

  @ApiProperty({
    default: 'Minas Gerais',
    description: 'State Name',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  state: string;

  @ApiProperty({
    default: 'Poços de Caldas',
    description: 'City Name',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  city: string;

  @ApiProperty({
    default: 'Avenida Jônathas Medina',
    description: 'Street Name',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  street: string;

  @ApiProperty({
    default: '1202',
    description: 'Residence Number',
    type: String,
  })
  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(127)
  number: string;

  @ApiProperty({
    default: 'Moradia ao lado do Parque Municipal',
    description: 'Complement',
    type: String,
  })
  @IsString()
  @MaxLength(127)
  @IsOptional()
  complement: string;
}
