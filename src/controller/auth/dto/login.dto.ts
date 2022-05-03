import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'example@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty12345' })
  readonly password: string;
}
