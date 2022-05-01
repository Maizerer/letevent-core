import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformFacilitiesEntity } from './PlatformFacilities.entity';

@Index('facilities_pkey', ['id'], { unique: true })
@Entity('facilities', { schema: 'public' })
export class FacilitiesEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'src' })
  src: string;

  @Column('text', { name: 'name' })
  name: string;

  @OneToMany(
    () => PlatformFacilitiesEntity,
    (platformFacilities) => platformFacilities.facility,
  )
  platformFacilities: PlatformFacilitiesEntity[];
}
