import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../enum-types/enum.type';

export class CreateOrganizerDto {
  @ApiProperty({ example: 'Иван' })
  readonly name: string;

  @ApiProperty({ example: 'Иванов' })
  readonly surname: string;

  @ApiProperty({ enum: Gender })
  readonly gender: Gender;

  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;

  @ApiProperty({ example: 'example@mail.ru' })
  readonly email: string;

  @ApiProperty({ example: '79655214738' })
  readonly phone: string;

  @ApiProperty({ example: '05.12.2022' })
  readonly bornDate: string;
}
