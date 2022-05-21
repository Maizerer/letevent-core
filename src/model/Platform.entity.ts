import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformFacilityEntity } from './PlatformFacilities.entity';
import { OwnerEntity } from './Owner.entity';
import { ReservsEntity } from './Reservs.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('platforms_pkey', ['id'], { unique: true })
@Entity('platforms', { schema: 'public' })
export class PlatformEntity {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty({ example: 'KazanHall' })
  @Column('text', { name: 'name' })
  name: string;

  @ApiProperty({ example: '10:00 - 2:00' })
  @Column('text', { name: 'graphic' })
  graphic: string;

  @ApiProperty({ example: 'г. Казань ул. Карла Маркса 12 д.5' })
  @Column('text', { name: 'address' })
  address: string;

  @ApiProperty({ example: 'Работаем по предоплате 50%' })
  @Column('text', { name: 'conditions' })
  conditions: string;

  @ApiProperty({ example: '79458732596' })
  @Column('text', { name: 'phone' })
  phone: string;

  @ApiProperty({ example: '2022-05-02 23:36:59.608362+03' })
  @Column('timestamptz', {
    name: 'reg_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDate: string;

  @ApiProperty({ example: 'Внутри запрещено курить' })
  @Column('text', { name: 'rules' })
  rules: string;

  @ApiProperty({ example: 50 })
  @Column('numeric', { name: 'area' })
  area: number;

  @ApiProperty({ example: '/uploads/photoKazan.jpg' })
  @Column('text', { name: 'main_img', nullable: true })
  mainImg: string | null;

  @ApiProperty({
    example: ['/uploads/photoKazan.jpg', '/uploads/mainRoom.jpg'],
  })
  @Column('text', { name: 'photos', nullable: true, array: true })
  photos: string[] | null;

  @ApiProperty({ example: 100 })
  @Column('numeric', { name: 'capacity' })
  capacity: number;

  @ApiProperty({
    example: 'Тут крутое описание площадки. Она с красивой терассой',
  })
  @Column('text', { name: 'description' })
  description: string;

  @ApiProperty({
    example: 5000,
  })
  @Column('numeric', { name: 'price' })
  price: number;

  @ApiProperty({
    example: 'f',
  })
  @Column('boolean', { name: 'is_deleted', default: 'f' })
  isDeleted: boolean;

  @OneToMany(
    () => PlatformFacilityEntity,
    (platformFacilities) => platformFacilities.platform,
  )
  platformFacilities: PlatformFacilityEntity[];

  @ManyToOne(() => OwnerEntity, (owners) => owners.platforms, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: OwnerEntity | number;

  @OneToMany(() => ReservsEntity, (reservs) => reservs.platform)
  reservs: ReservsEntity[];
}
