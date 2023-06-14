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
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  cpf: string;

  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  birth: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  account_type: boolean;

  @IsString()
  @IsOptional()
  avatar_url?: string;
}
