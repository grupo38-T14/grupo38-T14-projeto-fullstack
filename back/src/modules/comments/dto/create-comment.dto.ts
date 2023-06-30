import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString
} from "class-validator";

export class CreateCommentDto {
    @ApiProperty({
        default: 'Lindo Automovel',
        description: 'Commentary',
        type: String,
      })
    @IsString()
    @IsNotEmpty()
    comment: string
}
