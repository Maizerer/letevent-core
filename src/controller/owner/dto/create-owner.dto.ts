import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../enum-types/enum.type';

export class CreateOwnerDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty()
  readonly patronymic: string;

  @ApiProperty()
  readonly gender: Gender;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly bornDate: string;
}
