import { ApiProperty } from '@nestjs/swagger';

export class CreatePlatformDto {
  @ApiProperty({ example: 'KazanHall' })
  readonly name: string;

  @ApiProperty({ example: '10:00 - 2:00' })
  readonly graphic: string;

  @ApiProperty({ example: 'г. Казань ул. Карла Маркса 12 д.5' })
  readonly address: string;

  @ApiProperty({ example: 'Работаем по предоплате 50%' })
  readonly conditions: string;

  @ApiProperty({ example: '79458732596' })
  readonly phone: string;

  @ApiProperty({ example: 'Внутри запрещено курить' })
  readonly rules: string;

  @ApiProperty({ example: 50 })
  readonly area: number;

  readonly mainImg: string;

  @ApiProperty({ example: 100 })
  readonly capacity: number;

  @ApiProperty({
    example: 'Тут крутое описание площадки. Она с красивой терассой',
  })
  readonly description: string;

  @ApiProperty({ example: 5000 })
  readonly price: number;
}
