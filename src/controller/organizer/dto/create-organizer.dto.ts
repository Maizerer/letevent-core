import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../enum-types/enum.type';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOrganizerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иван' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иванов' })
  readonly surname: string;

  @IsNotEmpty()
  @ApiProperty({ enum: Gender })
  readonly gender: Gender;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({ example: 'example@mail.ru' })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @IsString()
  @ApiProperty({ example: '79655214738' })
  readonly phone: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2022-12-09' })
  readonly bornDate: string;
}
