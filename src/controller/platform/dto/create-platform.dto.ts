import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { OwnerEntity } from '../../../model/Owner.entity';

export class CreatePlatformDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'KazanHall' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '10:00 - 2:00' })
  readonly graphic: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'г. Казань ул. Карла Маркса 12 д.5' })
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Работаем по предоплате 50%' })
  readonly conditions: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @IsString()
  @ApiProperty({ example: '79458732596' })
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Внутри запрещено курить' })
  readonly rules: string;

  @IsNotEmpty()
  @ApiProperty({ example: 50 })
  readonly area: number;

  readonly mainImg: string;

  readonly owner: OwnerEntity;

  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  readonly capacity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Тут крутое описание площадки. Она с красивой терассой',
  })
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 5000 })
  readonly price: number;
}
