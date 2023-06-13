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

} from "class-validator"

export class CreateUserDto {
    
    @IsString()
    @Max(127)
    @IsNotEmpty()
    name: string

    @IsEmail()
    @Max(127)
    email: string

    @IsNumberString()
    @Length(11, 11)
    @IsNotEmpty()
    cpf: string

    @IsNumberString()
    @Length(11, 11)
    @IsNotEmpty()
    phone: string

    @IsDate()
    @IsOptional()
    birth: string

    @IsString()
    @Max(255)
    @IsOptional()
    description: string

    @IsString()
    @Max(127)
    @IsNotEmpty()
    password: string

    @IsBoolean()
    @IsNotEmpty()
    account_type: boolean

    @IsString()
    avatar_url: string
}
