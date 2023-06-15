import { Address } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  Length,
  Max,
  IsEmail,
  IsNumberString,
  IsDate,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Max(127)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Max(127)
  email: string;

  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  cpf: string;

  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  phone: string;

  @IsDate()
  @IsOptional()
  birth: string;

  @IsString()
  @Max(255)
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  account_type: boolean;

  @IsString()
  @IsNotEmpty()
  @Max(127)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;

  @IsOptional()
  address?: Address
}
