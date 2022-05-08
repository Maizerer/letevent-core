import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformFacilityEntity } from './PlatformFacilities.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('facilities_pkey', ['id'], { unique: true })
@Entity('facilities', { schema: 'public' })
export class FacilityEntity {
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
    () => PlatformFacilityEntity,
    (platformFacilities) => platformFacilities.facility,
  )
  platformFacilities: PlatformFacilityEntity[];
}
