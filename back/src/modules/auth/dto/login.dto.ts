import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    default: 'lucas@gmail.com',
    description: 'User Email',
    type: String,
  })
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '12345678',
    description: 'User Password',
    type: String,
  })
  @ApiProperty()
  @IsString()
  password: string;
}
