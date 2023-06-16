import { IsNotEmpty, IsNumberString, IsString, Length, Max } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    cep: string

    @IsString()
    @IsNotEmpty()
    @Max(127)
    state: string

    @IsString()
    @IsNotEmpty()
    @Max(127)
    city: string

    @IsString()
    @IsNotEmpty()
    @Max(127)
    street: string

    @IsNumberString()
    @IsNotEmpty()
    @Max(127)
    number: string

    @IsString()
    @Max(127)
    complement: string
}
