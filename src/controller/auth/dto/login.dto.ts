import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@gmail.com' })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'qwerty12345' })
  readonly password: string;
}
