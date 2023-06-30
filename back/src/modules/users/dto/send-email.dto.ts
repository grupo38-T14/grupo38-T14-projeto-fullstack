import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString
} from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    default: 'lucas@gmail.com',
    description: 'The person that will recive the messager',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    default: 'Nos temos uma grande noticia para você usuário!',
    description: 'Subject of the message',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    default: 'Neste mês teremos variais promoções em que...!',
    description: 'Content of the message',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
