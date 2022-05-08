import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../enum-types/enum.type';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иван' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иванов' })
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иванович' })
  readonly patronymic: string;

  @IsNotEmpty()
  @ApiProperty({ enum: Gender })
  readonly gender: Gender;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
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
