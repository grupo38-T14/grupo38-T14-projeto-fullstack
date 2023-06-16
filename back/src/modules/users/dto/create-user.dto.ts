import { Address } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  Length,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(127)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @MaxLength(127)
  email: string;

  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsOptional()
  birth: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;

  @IsBoolean()
  account_type: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;

  @IsOptional()
  address?: Address;
}
