import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { IsOptional } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    @IsOptional()
    cep: string

    @IsOptional()
    state: string

    @IsOptional()
    city: string

    @IsOptional()
    street: string

    @IsOptional()
    number: string

    @IsOptional()
    complement: string
}   
