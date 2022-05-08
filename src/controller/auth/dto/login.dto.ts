import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'example@gmail.com' })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({ example: 'qwerty12345' })
  readonly password: string;
}
