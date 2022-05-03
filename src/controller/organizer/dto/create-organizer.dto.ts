import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../enum-types/enum.type';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOrganizerDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Иван' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Иванов' })
  readonly surname: string;

  @IsNotEmpty()
  @ApiProperty({ enum: Gender })
  readonly gender: Gender;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'example@mail.ru' })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({ example: '79655214738' })
  readonly phone: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2022-12-09' })
  readonly bornDate: string;
}
