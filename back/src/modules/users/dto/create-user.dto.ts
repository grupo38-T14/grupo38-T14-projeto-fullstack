import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  Length,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/addresses/dto/create-address.dto';
import { Address } from 'src/modules/addresses/entities/address.entity';

export class CreateUserDto {
  @ApiProperty({
    default: 'Hobart Brown',
    description: 'User name',
    type: String,
  })
  @IsString()
  @MaxLength(127)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: 'Hobart@gmail.com',
    description: 'User Email',
    type: String,
  })
  @IsEmail()
  @MaxLength(127)
  email: string;

  @ApiProperty({
    default: '12345678910',
    description: 'User CPF',
    type: String,
  })
  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    default: '21 955967432',
    description: 'User Number',
    type: String,
  })
  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    default: '20/06/2004',
    description: 'User BirthDate',
    type: String,
  })
  @IsDateString()
  @IsOptional()
  birth: string;

  @ApiProperty({
    default: 'Tenho interesse em comprar ou vender automoveis',
    description: 'User Description',
    type: String,
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;

  @ApiProperty({
    default: 'Comprador ou Anunciante',
    description: 'User Account Type',
    type: String,
  })
  @IsBoolean()
  account_type: boolean;

  @ApiProperty({
    default: '12345678',
    description: 'User Password',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @ApiProperty({
    default:
      'https://i.pinimg.com/564x/8d/a2/6f/8da26f2aedf7d064347dbe9128c5227d.jpg',
    description: 'User Avatar',
    type: String,
  })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiProperty({
    default: 'User Address',
    description: 'User Address',
    type: String,
  })
  @IsOptional()
  address?: Address;
}
