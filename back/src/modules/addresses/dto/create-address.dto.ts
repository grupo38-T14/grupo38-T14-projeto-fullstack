import { IsNotEmpty, IsNumberString, IsString, Length, MaxLength } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    cep: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(127)
    state: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(127)
    city: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(127)
    street: string

    @IsNumberString()
    @IsNotEmpty()
    @MaxLength(127)
    number: string

    @IsString()
    @MaxLength(127)
    complement: string
}
