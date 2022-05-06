import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformFacilitiesEntity } from './PlatformFacilities.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('facilities_pkey', ['id'], { unique: true })
@Entity('facilities', { schema: 'public' })
export class FacilitiesEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty({ example: '/uploads/filename.png' })
  @Column('text', { name: 'src' })
  src: string;

  @ApiProperty({ example: 'Фуршет' })
  @Column('text', { name: 'name' })
  name: string;

  @OneToMany(
    () => PlatformFacilitiesEntity,
    (platformFacilities) => platformFacilities.facility,
  )
  platformFacilities: PlatformFacilitiesEntity[];
}
